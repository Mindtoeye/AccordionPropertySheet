
import React, { Component } from 'react';

import DatePicker from "react-datepicker";
import Draggable, {DraggableCore} from 'react-draggable';

import FontPicker from './FontPicker';
import FontTools from './utils/fonttools';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { faMinusSquare } from '@fortawesome/free-solid-svg-icons'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
 
import "react-datepicker/dist/react-datepicker.css";

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
  	  x: 10,
  	  y: 10,
  	  width: 100,
  	  height: 150,
  	  folded: false,
  	  popout: false,
  	  startDate: new Date(),
      fonts: [
        "Arial",
        "Arial Narrow",
        "Arial Black",
        "Courier New",
        "Georgia",
        "Lucida Console",
        "Lucida Sans Unicode",
        "Tahoma",
        "Times New Roman",
        "Verdana"
      ],
      typeface: [
        "Regular",
        "Italic",
        "Bold",
        "Bold Italic"
      ],
      sizes: [
        "12",
        "14",
        "16",
        "18",
        "20",
        "22",
        "24",
        "28",
        "30",
        "32",
        "36"
      ],
      style: {
        font: this.props.font,
        typeface: this.props.typeface,
        size: this.props.size
      }  	    	    	  
  	};

    this.fontTools= new FontTools ();

  	this.onFold = this.onFold.bind(this);
  	this.onPopout = this.onPopout.bind(this);
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
  onPopout () {
  	if (this.state.popout==true) {
  	  this.setState ({popout: false});
  	} else {
  	  let pos=this.props.getPanelLocation (this.props.panelId);
  	  pos.x=10;
  	  pos.y=10;
  	  this.setState ({x: pos.x, y: pos.y, width: pos.width, height: pos.height, popout: true});
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
  fieldDateToComponent (aField) {
  	return (<label>
       {aField.name}
       <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
        />
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
  fieldFontToComponent (aField) {
    let sample=this.fontTools.fontSpecToSample (this.state.style);
    let sampleStyle=this.fontTools.fontSpecToStyle (this.state.style);
      	
	return (<label>
     {aField.name}  	
     <FontPicker label="Choose Font" fonts={this.state.fonts} previews={true} activeColor="#64B5F6" value="" onChange={this.handleFontChange.bind(this)}/>
     <FontPicker label="Typeface" fonts={this.state.typeface} previews={true} activeColor="#64B5F6" value="" onChange={this.handleTypefaceChange.bind(this)}/> 
     <FontPicker label="Size" fonts={this.state.sizes} previews={true} activeColor="#64B5F6" value="" onChange={this.handleFontSizeChange.bind(this)}/> 
     <div id="fontsample" className="fontsample" style={sampleStyle}>
     {sample}
     </div>
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

  	if (aField.type=="date") {
  	  content=this.fieldDateToComponent (aField);
  	} 

  	if (aField.type=="font") {
  	  content=this.fieldFontToComponent (aField);
  	}   	

  	return (<div key={"field-"+anIndex} className="propertyfield">{content}</div>);
  }

  /**
   *
   */
  handleFontChange (selectedFont) {
    console.log ("handleFontChange ("+selectedFont+")");

    let newStyle=this.dataTools.deepCopy (this.state.style);

    newStyle.font=selectedFont;

    this.setState ({
      style: newStyle
    },(e)=>{
      if (this.props.applyFontChange) {
        this.props.applyFontChange (this.fontTools.fontSpecToStyle (this.state.style));
      }  
    });

    if (this.props.applyFontChange) {
      this.props.applyFontChange (this.fontTools.fontSpecToStyle (this.state.style));
    }
  }

  /**
   *
   */
  handleTypefaceChange (selectedTypeface) {
    console.log ("handleTypefaceChange ("+selectedTypeface+")");

    let newStyle=this.dataTools.deepCopy (this.state.style);

    newStyle.typeface=selectedTypeface;

    this.setState ({
      style: newStyle
    },(e)=>{
      if (this.props.applyFontChange) {
        this.props.applyFontChange (this.fontTools.fontSpecToStyle (this.state.style));
      }  
    });

    if (this.props.applyFontChange) {
      this.props.applyFontChange (this.fontTools.fontSpecToStyle (this.state.style));
    }   
  }

  /**
   *
   */
  handleFontSizeChange (selectedFontSize) {
    console.log ("handleFontSizeChange ("+selectedFontSize+")");

    let newStyle=this.dataTools.deepCopy (this.state.style);

    newStyle.size=selectedFontSize;

    this.setState ({
      style: newStyle
    },(e)=>{
      if (this.props.applyFontChange) {
        this.props.applyFontChange (this.fontTools.fontSpecToStyle (this.state.style));
      }  
    });      
  }     

  /**
   *
   */
  render () {
  	let accordionpanel="accordionpanelfolded";
  	let foldicon=<FontAwesomeIcon icon={faPlusSquare}/>;
  	let popouticon=<FontAwesomeIcon icon={faExternalLinkAlt}/>
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

    if (this.state.popout==true) {
	  return (<Draggable handle=".accordiontitlebar" scale={1}>
	    <div ref={this.props.panelId} className="accordionpanelpopout" style={{left: this.state.x, top: this.state.y, width: this.state.width, height: this.state.height}}>
		   <div className="accordiontitlebar">
		   {this.props.title}
		   <div className="accordionpanelpop" onClick={this.onPopout}>
		     {popouticon}
		   </div>        
		   </div>
		   {content}
		  </div>
	   </Draggable>);
    }

    return (<div className={accordionpanel}>
      <div className="accordiontitlebar">
        {this.props.title}
        <div className="accordionpanelfold" onClick={this.onFold}>
          {foldicon}
        </div>
        <div className="accordionpanelpop" onClick={this.onPopout}>
          {popouticon}
        </div>        
      </div>
      {content}
    </div>);  
  }
}

export default AccordionPanel;
