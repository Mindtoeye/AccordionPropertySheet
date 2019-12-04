
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
  	  folded: false,
  	  data: props.data,
  	  panels: []  		
  	};

    this.dataTools=new DataTools ();

    this.getPanelLocation = this.getPanelLocation.bind(this);
  	this.onFold = this.onFold.bind(this);
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
    console.log ("updatePanelData ("+aPanelId+")");

    let updatedPanels=this.dataTools.deepCopy (this.state.data);
    
    for (let i=0;i<updatedPanels.length;i++) {
      let panel=updatedPanels [i];
      if (panel.uuid==aPanelId) {
        panel.popout=poppedout;
        panel.folded=folded;
        if (panelDimensions) {
          panel.x=panelDimensions.x;
          panel.y=panelDimensions.y;
          panel.width=panelDimensions.width;
          panel.height=panelDimensions.height;
        }
      }
    }

    this.setState ({data: updatedPanels});
  }

  /**
   *
   */
  allIn () {
    console.log ("allIn ()");

    let updatedPanels=this.dataTools.deepCopy (this.state.data);
    
    for (let i=0;i<updatedPanels.length;i++) {
      let panel=updatedPanels [i];
      if (panel.uuid==aPanelId) {
        panel.popout=false;
      }
    }

    this.setState ({data: updatedPanels});    
  }

  /**
   *
   */
  allOut () {
    console.log ("allOut ()");
  }  

  /**
   *
   */
  processPanelButton (aPanelId) {
    console.log ("processPanelButton ()");

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
   * <a onClick={this.allIn.bind(this)} href="#">all in</a>
   * <a onClick={this.allOut.bind(this)} href="#">all out</a>
   */
  render () {
  	let panelsPopout=[];
    let panelsManaged=[];

    for (let i=0;i<this.state.data.length;i++) {
      let panelData=this.state.data [i];
      if (panelData.visible==true) {
        if (panelData.popout==true) {
          let panel=<AccordionPanel updatePanelData={this.updatePanelData.bind(this)} key={panelData.uuid} ref={panelData.uuid} panelId={panelData.uuid} getPanelLocation={this.getPanelLocation} title={panelData.title} data={panelData} />
          panelsPopout.push(panel);
        } else {
          let panel=<AccordionPanel updatePanelData={this.updatePanelData.bind(this)} key={panelData.uuid} ref={panelData.uuid} panelId={panelData.uuid} getPanelLocation={this.getPanelLocation} title={panelData.title} data={panelData} />
          panelsManaged.push(panel);
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
          <FontAwesomeIcon icon={faAngleDoubleRight} onClick={this.onFold} />
    	  </div>
    	  {panelsManaged}
    	</div>
    </div>);
  }
}

export default AccordionPropertySheet;
