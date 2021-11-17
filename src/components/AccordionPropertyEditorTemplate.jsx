import React, { Component } from 'react';

import '../../css/accordionsheet.css';

/**
 *
 */
class AccordionPropertyEditorTemplate extends Component {

  /**
   *
   */
  constructor (props) {
  	super(props);

  	this.state={
      value: null
  	};

  	this.handleChange = this.handleChange.bind (this);
  }

  /**
   *
   */
  handleChange (e) {
    console.log ("handleChange ()");    

    if (this.props.processFieldChange) {
      this.props.processFieldChang (this.props.field.uuid,e.target.value);
    }
  }  

  /**
   *
   */
  render () {
    return (<div>
      <label>
       {this.props.field.name}
       <input className="propertyfield" type="text" value={this.props.field.value} onChange={this.handleChange} />
      </label>
    </div>);  
  }
}

export default AccordionPropertyEditorTemplate;
