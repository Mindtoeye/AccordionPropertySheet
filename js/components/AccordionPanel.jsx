
import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { faMinusSquare } from '@fortawesome/free-solid-svg-icons'

import '../../css/accordionsheet.css';

/**
 *
 */
class AccordionPanel extends Component {

  /**
   *
   */
  constructor (props) {
  	super(props);

  	this.state={
  	  folded: false
  	};

  	this.onFold = this.onFold.bind(this);
  }

  /**
   *
   */
  onFold () {
  	console.log ("onFold ()");

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
  	let accordionpanel="accordionpanelfolded";
  	let foldicon=<FontAwesomeIcon icon={faPlusSquare}/>;
  	let content;

  	if (this.state.folded==false) {
  	  accordionpanel="accordionpanel";
  	  foldicon=<FontAwesomeIcon icon={faMinusSquare}/>;
  	  content=<div className="accordioncontent">
        {this.props.children}
      </div>;
  	}

    return (<div className={accordionpanel}>
      <div className="accordiontitlebar">
        {this.props.title}
        <div className="accordionpanelfold" onClick={this.onFold}>
          {foldicon}
        </div>
      </div>
      {content}
    </div>);  
  }
}

export default AccordionPanel;
