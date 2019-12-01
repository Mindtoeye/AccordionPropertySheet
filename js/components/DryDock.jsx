import React, { Component } from 'react';

import AccordionPropertySheet from './AccordionPropertySheet';

import '../../css/main.css';
import '../../css/accordionsheet.css';

/**
 * 
 */
class DryDock extends Component {

  /**
   *
   */
  constructor(props) {
    super(props);
    this.state = {
          
    };
  }

  /**
   *
   */
  render() {
    return (
      <div className="maincontainer">        
        <div id="canvas" className="canvas">
        </div>
        <AccordionPropertySheet />
      </div>
    );
  }
}

export default DryDock;