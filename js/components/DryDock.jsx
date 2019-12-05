import React, { Component } from 'react';

// https://github.com/reduxjs/redux-devtools/blob/master/packages/react-json-tree/examples/src/App.js
import JSONTree from 'react-json-tree'

import AccordionPropertySheet from './AccordionPropertySheet';
import DataTools from './utils/datatools';
import DataFactory from './data/datafactory';

import '../../css/main.css';
import '../../css/accordionsheet.css';

const theme = {
  scheme: 'monokai',
  author: 'wimer hazenberg (http://www.monokai.nl)',
  base00: '#272822',
  base01: '#383830',
  base02: '#49483e',
  base03: '#75715e',
  base04: '#a59f85',
  base05: '#f8f8f2',
  base06: '#f5f4f1',
  base07: '#f9f8f5',
  base08: '#f92672',
  base09: '#fd971f',
  base0A: '#f4bf75',
  base0B: '#a6e22e',
  base0C: '#a1efe4',
  base0D: '#66d9ef',
  base0E: '#ae81ff',
  base0F: '#cc6633'
};

/**
 * 
 */
class DryDock extends Component {

  /**
   *
   */
  constructor(props) {
    super(props);
    
    this.dataTools=new DataTools ();
    this.dataFactory=new DataFactory ();

    this.state = {
      data : this.prepData(this.dataFactory.getDefaultData ())
    };

    //console.log (JSON.stringify (this.state.data));

    this.processPanelButton=this.processPanelButton.bind (this);
  }

  /**
   *
   */
  prepData (data) {
    let newData=this.dataTools.deepCopy (data);

    for (let i=0;i<newData.length;i++) {
      let panel=newData [i];
      panel.uuid=this.dataTools.uuidv4();
      panel.visible=true;
      panel.popout=false;
      panel.folded=false;
      panel.zIndex=10;
      panel.x=10;
      panel.y=10;
      panel.width=100;
      panel.height=150;

      for (let j=0;j<panel.fields.length;j++) {
        let field=panel.fields [j];
        field.uuid=this.dataTools.uuidv4();
      }
    } 

    return (newData);
  }

  /**
   *
   */
  createPanelButtons () {
    let buttons=[];

    for (let i=0;i<this.state.data.length;i++) {
      let panel=this.state.data [i];
      let panelButton=<button id={panel.uuid} onClick={(e) => this.processPanelButton (panel.uuid)} className="panelbutton" key={"panelbutton-"+i}>{panel.title}</button>;
      buttons.push(panelButton);
    }

    return (buttons);
  }

  /**
   *
   */
  processPanelButton (id) {
    this.refs ["propertysheet"].processPanelButton (id);
  }

  /**
   *
   */
  render() {
    let panelbuttons;

    panelbuttons=this.createPanelButtons ();

    return (
      <div className="maincontainer">
        <div id="canvas" className="leftpane">
          <div id="toolbar" className="toolbar">
           {panelbuttons}
          </div>
          <div id="datatree" className="canvas">
            <JSONTree data={this.state.data} theme={theme} invertTheme={true} />
          </div>
        </div>
        <AccordionPropertySheet ref="propertysheet" data={this.state.data} />
      </div>
    );
  }
}

export default DryDock;
