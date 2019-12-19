
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import DataTools from './utils/datatools';
import AccordionPanel from './AccordionPanel';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons'
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'

import '../../css/accordionsheet.css';

/**
*
*/
class AccordionPropertySheet extends Component {

  /**
   *
   */
  constructor (props) {
  	super(props);

  	this.state = {
  	  folded: false, // Local state of panel prop, investigate this!
  	  data: props.data, // The incoming data, we need to remove this and rely on props only
      winlist: [] // a local strucure to hold a list of all the popped out panels in z-index order
  	};

    this.dataTools=new DataTools ();

    this.getPanelLocation = this.getPanelLocation.bind(this);
  	this.onFold = this.onFold.bind(this);
    this.updatePanelData = this.updatePanelData.bind(this);
  }

  /**
   *
   */
  getPanelLocation (aPanel) {
  	let ref=ReactDOM.findDOMNode(this.refs[aPanel]);

  	if (ref!=null) {
  	  return (ref.getBoundingClientRect());
  	} else {
  	  console.log ("Internal error: can't obtain reference to panel: " + aPanel);
  	}
   
    return ({x: 10, y: 10, width: 100, height: 150});
  }

  /**
   *
   */
  onFold () {
  	if (this.state.folded==true) {
  	  this.setState ({folded: false});	
  	} else {
  	  this.setState ({folded: true});	
  	}
  }

  /**
   *
   */
  findPanel (aPanelId) {
    for (let i=0;i<this.state.data.length;i++) {
      let panel=this.state.data [i];
      if (panel.uuid==aPanelId) {
        return (panel);
      }
    }

    return (null);
  }

  /**
   *
   */
  updatePanelData (aPanelId, folded, poppedout, panelDimensions) {
    let updatedPanels=this.dataTools.deepCopy (this.state.data);
    let updatedWinlist=this.dataTools.deepCopy (this.state.winlist);
    
    for (let i=0;i<updatedPanels.length;i++) {
      let panel=updatedPanels [i];

      if (panel.uuid==aPanelId) {
        panel.popout=poppedout;

        // Activate code that configures the window stack
        if (panel.popout==true) {
          panel.folded=false;

          if (panelDimensions) {
            panel.x=panelDimensions.x+10;
            panel.y=panelDimensions.y+10;
            panel.width=panelDimensions.width;
            panel.height=panelDimensions.height;
          }

          updatedWinlist.push (panel);
        } else {
          for (let j=0;j<updatedWinlist.length;j++) {
            let delPanel=updatedWinlist [j];
            if (delPanel.uuid==panel.uuid) {
              this.dataTools.removeElement (updatedWinlist,delPanel);
              break;              
            }
          }
            
          panel.folded=folded;
          
          if (this.state.folded==true) {
            this.onFold ();
          }
        }

        this.setState ({data: updatedPanels, winlist: updatedWinlist});
        return;
      }
    }
  }

  /**
   *
   */
  allIn () {
    let updatedPanels=this.dataTools.deepCopy (this.state.data);
    
    for (let i=0;i<updatedPanels.length;i++) {
      let panel=updatedPanels [i];
      panel.popout=false;
    }

    this.setState ({data: updatedPanels});    
  }

  /**
   *
   */
  processPanelButton (aPanelId) {
    let updatedPanels=this.dataTools.deepCopy (this.state.data);
    
    for (let i=0;i<updatedPanels.length;i++) {
      let panel=updatedPanels [i];
      if (panel.uuid==aPanelId) {
        if (panel.visible==true) {
          panel.visible=false;
        } else {
          panel.visible=true;
        }
      }
    }

    this.setState ({data: updatedPanels});   
  }

  /**
   *
   */
  handleWindowPop (aPanelId) {
    let updatedPanels=this.dataTools.deepCopy (this.state.winlist);
    let targetPanel=null;

    // Remove the panel we want to move to the top
    for (let i=0;i<updatedPanels.length;i++) {
      targetPanel=updatedPanels [i];
      if (targetPanel.uuid==aPanelId) {
        this.dataTools.removeElement (updatedPanels,targetPanel);
        break;    
      }
    }
  
    // Insert it at the end of the array
    updatedPanels.push (targetPanel);

    // And now re-index;
    for (let j=0;j<updatedPanels.length;j++) {
      let panel=updatedPanels [j];
      panel.zIndex=(j*10);
    }    

    this.setState ({winlist: updatedPanels});     
  }

  /**
   *
   */
  render () {
  	let panelsPopout=[];
    let panelsManaged=[];

    for (let i=0;i<this.state.data.length;i++) {
      let panelData=this.state.data [i];
      if (panelData.visible==true) {
        if (panelData.popout==true) {
          let panelShadow=<AccordionPanel key={panelData.uuid+"-shadow"} shadow="true" data={panelData} title={panelData.title} />
          panelsManaged.push(panelShadow);          
        } else {
          let panel=<AccordionPanel updatePanelData={this.updatePanelData} key={panelData.uuid} ref={panelData.uuid} panelId={panelData.uuid} getPanelLocation={this.getPanelLocation} title={panelData.title} data={panelData} />
          panelsManaged.push(panel);
        }
      }
    }

    for (let i=0;i<this.state.winlist.length;i++) {
      let panelData=this.state.winlist [i];
      if (panelData.visible==true) {
        if (panelData.popout==true) {          
          let panel=<AccordionPanel updatePanelData={this.updatePanelData} key={panelData.uuid} ref={panelData.uuid} panelId={panelData.uuid} getPanelLocation={this.getPanelLocation} title={panelData.title} data={panelData} handleWindowPop={this.handleWindowPop.bind(this)} />
          panelsPopout.push(panel);
        }
      }
    }    

    if (this.state.folded==true) {
      return (<div>
        {panelsPopout}
        <div id="accordionsheet" className="accordionsheetfolded">
        <div className="accordionmenu">
          <FontAwesomeIcon icon={faAngleDoubleLeft} onClick={this.onFold} />
  	    </div>
  	  </div>
      </div>);
    }

  	return (<div>
      {panelsPopout}
      <div id="accordionsheet" className="accordionsheet">
    	  <div className="accordionmenu">
          <FontAwesomeIcon icon={faAngleDoubleRight} onClick={this.onFold} style={{"float": "left", "marginTop": "1px"}}/>
          <div className="accordionmenutitle">Properties</div>
          <div className="accordionsheetlabelbutton fauxbutton"><a onClick={this.allIn.bind(this)} href="#">all in</a></div>
    	  </div>
    	  {panelsManaged}
    	</div>
    </div>);
  }
}

export default AccordionPropertySheet;
