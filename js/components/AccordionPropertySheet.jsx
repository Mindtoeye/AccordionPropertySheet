
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

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
  	  panels: []  		
  	};

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
   
    return ({x: 10, y: 10});
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
  render () {
  	let panels=[];

    for (let i=0;i<this.props.data.length;i++) {
      let panelData=this.props.data [i];
      let panel=<AccordionPanel key={"panel-"+i} ref={"panel-"+i} panelId={"panel-"+i} getPanelLocation={this.getPanelLocation} title={panelData.title} fields={panelData.fields} />
      panels.push(panel);
    }

    if (this.state.folded==true) {
      return (<div id="accordionsheet" className="accordionsheetfolded">
        <div className="accordionmenu">
          <FontAwesomeIcon icon={faAngleDoubleLeft} onClick={this.onFold} />
  	    </div>
  	  </div>);
    }

  	return (<div id="accordionsheet" className="accordionsheet">
  	  <div className="accordionmenu">
        <FontAwesomeIcon icon={faAngleDoubleRight} onClick={this.onFold} />
  	  </div>
  	  {panels}
  	</div>);
  }
}

export default AccordionPropertySheet;
