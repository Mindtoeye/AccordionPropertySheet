
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
  handleChange () {
    console.log ("handleChange ()");  	
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
  fieldStringToComponent (aField) {
    return (	
      <label>
       {aField.name}
       <input className="propertyfield" type="text" value={aField.value} onChange={this.handleChange} />
      </label>);
  }

  /**
   *
   */
  fieldBooleanToComponent (aField) {  	
    return (
   	  <div>
   	    {aField.name}<br />
        <label>        
          <input type="radio" value="true" checked={true} onChange={this.handleChange} />True<br />
        </label>
        <label>
          <input type="radio" value="false" checked={false} onChange={this.handleChange} />False<br />
        </label>
    </div>);
  }
  
  /**
   *
   */
  fieldIntegerToComponent (aField) {
    return (<label>
       {aField.name}
       <input className="propertyfield" type="text" value={aField.value} onChange={this.handleChange} />
      </label>);  	
  }
  
  /**
   *
   */
  fieldFloatToComponent (aField) {
    return (<label>
       {aField.name}
       <input className="propertyfield" type="text" value={aField.value} onChange={this.handleChange} />
      </label>);  	
  }      

  /**
   *
   */
  fieldTextToComponent (aField) {
  	return (<label>
       {aField.name}
       <textarea value={aField.value} rows="5" className="propertyfield propertytextarea" onChange={this.handleChange} />
    </label>);  	
  } 

  /**
   *
   */
  fieldEnumToComponent (aField) {  	
	return (<label>
     {aField.name}
     <select className="propertyfield">
	  <option value="grapefruit">Grapefruit</option>
	  <option value="lime">Lime</option>
	  <option value="coconut">Coconut</option>
	  <option value="mango">Mango</option>
	 </select>
	</label>);
  }   

  /**
  *
  */
  fieldToComponent (aField, anIndex) {
  	let content;

  	if (aField.type=="string") {
  	  content=this.fieldStringToComponent (aField);
  	}

  	if (aField.type=="boolean") {
  	  content=this.fieldBooleanToComponent (aField);
  	}

  	if (aField.type=="integer") {
  	  content=this.fieldIntegerToComponent (aField);
  	}
  	
  	if (aField.type=="float") {
  	  content=this.fieldFloatToComponent (aField);
  	}
  	
  	if (aField.type=="text") {
  	  content=this.fieldTextToComponent (aField);
  	}  	
  	
  	if (aField.type=="enum") {
  	  content=this.fieldEnumToComponent (aField);
  	}   	  	  	

  	return (<div key={"field-"+anIndex} className="propertyfield">{content}</div>);
  }

  /**
   *
   */
  render () {
  	let accordionpanel="accordionpanelfolded";
  	let foldicon=<FontAwesomeIcon icon={faPlusSquare}/>;
  	let content;
  	let fields=[];

  	if (this.state.folded==false) {
  	  accordionpanel="accordionpanel";
  	  foldicon=<FontAwesomeIcon icon={faMinusSquare}/>;

      for (let i=0;i<this.props.fields.length;i++) {
      	let newField=this.fieldToComponent (this.props.fields [i],i);
      	fields.push (newField);
      }

  	  content=<div className="accordioncontent">{fields}</div>;
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
