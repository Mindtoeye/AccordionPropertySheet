
import React, { Component } from 'react';

import DatePicker from "react-datepicker";
import Draggable, {DraggableCore} from 'react-draggable';

import FontPicker from './FontPicker';
import FontTools from './utils/fonttools';

import AccordionPropertyEditorTemplate from './AccordionPropertyEditorTemplate';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { faMinusSquare } from '@fortawesome/free-solid-svg-icons'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
 
import "react-datepicker/dist/react-datepicker.css";

import '../../css/accordionsheet.css';

const extract = (str, pattern) => (str.match(pattern) || []).pop() || '';

const extractHexadecimalWithColon = (str) => extract(str, "[0-9a-fA-F:]+");

const extractHexadecimal = (str) => extract(str, "[0-9a-fA-F]+");

const extractAlphanum = (str) => extract(str, "[0-9a-zA-Z]+");

const extractAlpha = (str) => extract(str, "[a-zA-Z]+");

const extractAlphaFloat = (str) => extract(str, "[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$");

const not = (aValue) => {if (aValue==true) {return (false);} return (true);}

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
      valueBoolean: true,
      valueString: "",
      valueText: "",
      valueInteger: 0,
      valueFloat: 0.0,
      valueHex: 0x12,
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
    this.handleTitleClick = this.handleTitleClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleBooleanChange = this.handleBooleanChange.bind(this);
    this.handleIntegerChange = this.handleIntegerChange.bind(this);
    this.handleFloatChange = this.handleFloatChange.bind(this);
    this.handleHexChange = this.handleHexChange.bind(this);
    this.foldIn = this.foldIn.bind(this);
    this.foldOut = this.foldOut.bind(this);
  }

  /**
   *
   */
  handleStringChange (e) {
    console.log ("handleStringChange ()");    

    this.setState ({valueString: e.target.value});
  }

  /**
   *
   */
  handleTextChange (e) {
    console.log ("handleTextChange ()");  	

    this.setState ({valueText: e.target.value});
  }

  /**
   * https://stackoverflow.com/questions/36304248/in-react-js-i-want-to-validate-length-and-restrict-numeric-alphanumeric-and-u
   */
  handleBooleanChange (e) {
    console.log ("handleBooleanChange ("+e.target.value+")"); 
    
    //this.setState ({valueString: e.target.value});   
  }

  /**
   * https://stackoverflow.com/questions/36304248/in-react-js-i-want-to-validate-length-and-restrict-numeric-alphanumeric-and-u
   */
  handleIntegerChange (e) {
    console.log ("handleIntegerChange ()");    

    if (e.target.value=="") {
      this.setState ({valueInteger: 0});
      return;
    }    

    this.setState ({valueInteger: extractAlpha(e.target.value)});
  }  

  /**
   * https://stackoverflow.com/questions/36304248/in-react-js-i-want-to-validate-length-and-restrict-numeric-alphanumeric-and-u
   */
  handleFloatChange (e) {
    console.log ("handleFloatChange ()");

    if (e.target.value=="") {
      this.setState ({valueFloat: 0.0});
      return;      
    }    

    this.setState ({valueFloat: extractAlphaFloat(e.target.value)});
  }   


  /**
   * https://stackoverflow.com/questions/36304248/in-react-js-i-want-to-validate-length-and-restrict-numeric-alphanumeric-and-u
   */
  handleHexChange (e) {
    console.log ("handleHexChange ()");

    if (e.target.value=="") {
      this.setState ({valueHex: 0});
      return;      
    }

    this.setState ({valueHex: extractHexadecimal(e.target.value)});
  }  

  /**
   *
   */
  onFold () {  	
  	if (this.props.data.folded==true) {
      this.foldOut ();
  	} else {
      this.foldIn ();
  	}
  }

  /**
   *
   */
  foldIn () {
    if (this.props.updatePanelData) {
     this.props.updatePanelData (this.props.data.uuid,true,this.props.data.popout,null);
    }
  }

  /**
   *
   */
  foldOut () {
    if (this.props.updatePanelData) {
     this.props.updatePanelData (this.props.data.uuid,false,this.props.data.popout,null);
    }
  }  

  /**
   *
   */
  onPopout (e) {
    e.stopPropagation();
    
    if (this.props.data.popout==true) {
      // Pop back in
      if (this.props.updatePanelData) {
        this.props.updatePanelData (this.props.data.uuid,this.props.data.folded,false,null);
      }
    } else {
      if (this.props.updatePanelData) {
        // Pop the panel out
        if (this.props.data.folded==true) {
          this.foldOut();
        }
        let pos=this.props.getPanelLocation (this.props.data.uuid);
        this.props.updatePanelData (this.props.data.uuid,this.props.data.folded,true,pos);  
      }      
    }    
  }

  /**
   *
   */
  fieldStringToComponent (aField) {
    return (	
      <label>
       {aField.name}
       <input className="propertyfield" type="text" value={this.state.valueString} onChange={this.handleStringChange} />
      </label>);
  }

  /**
   *
   */
  fieldBooleanToComponent (aField) {  	
    let checked=true;

    if (this.state.valueBoolean==true) {
      checked=true;  
    } else {
      checked=false;
    }

    return (
   	  <div>
   	    {aField.name}<br />
        <label> 
          <input type="radio" value="boolean" checked={checked} onChange={this.handleBooleanChange} />True<br />
        </label>
        <label>
          <input type="radio" value="boolean" checked={not(checked)} onChange={this.handleBooleanChange} />False<br />
        </label>
    </div>);
  }
  
  /**
   *
   */
  fieldIntegerToComponent (aField) {
    return (<label>
       {aField.name}
       <input className="propertyfield" type="text" value={this.state.valueInteger} onChange={this.handleIntegerChange} />
      </label>);  	
  }
  
  /**
   *
   */
  fieldFloatToComponent (aField) {
    return (<label>
       {aField.name}
       <input className="propertyfield" type="text" value={this.state.valueFloat} onChange={this.handleFloatChange} />
      </label>);  	
  }
  
  /**
   *
   */
  fieldHexToComponent (aField) {
    return (<label>
       {aField.name}
       <input className="propertyfield" type="text" value={this.state.valueHex} onChange={this.handleHexChange} />
      </label>);    
  }      

  /**
   *
   */
  fieldTextToComponent (aField) {
  	return (<label>
       {aField.name}
       <textarea value={aField.valueText} rows="5" className="propertyfield propertytextarea" onChange={this.handleTextChange} />
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

    if (aField.type=="hex") {
      content=this.fieldHexToComponent (aField);
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
  handleTitleClick () {
    if (this.props.handleWindowPop) {
      this.props.handleWindowPop (this.props.data.uuid);
    }
  }

  /**
   *
   */
  render () {
    if (this.props.shadow=="true") {
      let height=150;
      if (this.props.data.height) {
        height=this.props.data.height;
      }
      return (<div className="accordionpanelshadow" style={{height: height}}>
        <div className="centertext">
        {this.props.title}
        </div>
      </div>);
    }

  	let accordionpanel="accordionpanelfolded";
  	let foldicon=<FontAwesomeIcon icon={faPlusSquare}/>;
  	let popouticon=<FontAwesomeIcon icon={faExternalLinkAlt}/>
  	let content;
  	let fields=[];

  	if (this.props.data.folded==false) {
  	  accordionpanel="accordionpanel";
  	  foldicon=<FontAwesomeIcon icon={faMinusSquare}/>;

      for (let i=0;i<this.props.data.fields.length;i++) {
      	let newField=this.fieldToComponent (this.props.data.fields [i],i);
      	fields.push (newField);
      }

  	  content=<div className="accordioncontent">{fields}</div>;
  	}

    if (this.props.data.popout==true) {
  	  return (<Draggable handle=".accordiontitlebarpopped" scale={1}>
  	    <div ref={this.props.panelId} className="accordionpanelpopout" style={{left: this.props.data.x, top: this.props.data.y, width: this.props.data.width, height: this.props.data.height, zIndex: this.props.data.zIndex}}>
  		   <div className="accordiontitlebarpopped" onClick={this.handleTitleClick}>
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
