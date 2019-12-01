
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
  	return (<div id="accordionsheet" className="accordionsheet">
  	  <AccordionPanel />
  	  <AccordionPanel />
    </div>);
  }
}

export default AccordionPropertySheet;