
import React, { Component } from 'react';

import AccordionPanel from './AccordionPanel';

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
  	  panels: []  		
  	};
  }

  /**
   *
   */
  render () {
  	let panels=[];

    for (let i=0;i<this.props.data.length;i++) {
      let panelData=this.props.data [i];
      let panel=<AccordionPanel key={"panel-"+i} title={panelData.title} fields={panelData.fields} />
      panels.push(panel);
    }

  	return (<div id="accordionsheet" className="accordionsheet" >{panels}</div>);
  }
}

export default AccordionPropertySheet;