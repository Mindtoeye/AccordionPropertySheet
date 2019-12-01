import React, { Component } from 'react';

import JSONTree from 'react-json-tree'

import AccordionPropertySheet from './AccordionPropertySheet';

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
    this.state = {
      data : [
        {
          title: "Primitives",
          fields:[
            {
              name: "boolean",
              value: true,
              type: "boolean"
            },
            {
              name: "string",
              value: "default value",
              type: "string"
            },
            {
              name: "integer",
              value: 10,
              type: "integer"
            },
            {
              name: "float",
              value: 1.0,
              type: "float"
            }
          ]
        },
        {
          title: "Pure Text",
          fields:[
            {
              name: "text",
              value: true,
              type: "text"
            }
          ]
        }        
      ]
    };
  }

  /**
   *
   */
  render() {
    return (
      <div className="maincontainer">        
        <div id="canvas" className="canvas">
          <JSONTree data={this.state.data} theme={theme} invertTheme={true} />
        </div>
        <AccordionPropertySheet data={this.state.data} />
      </div>
    );
  }
}

export default DryDock;