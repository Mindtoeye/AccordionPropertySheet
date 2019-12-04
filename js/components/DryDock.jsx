import React, { Component } from 'react';

import JSONTree from 'react-json-tree'

import AccordionPropertySheet from './AccordionPropertySheet';
import DataTools from './utils/datatools';

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
              name: "Boolean Value",
              value: true,
              type: "boolean"
            },
            {
              name: "String Value",
              value: "",
              type: "string"
            },
            {
              name: "Integer Value",
              value: 10,
              type: "integer"
            },
            {
              name: "Float Value",
              value: 1.0,
              type: "float"
            },
            {
              name: "List Value",
              value: ["Red","Green","Blue","Yellow","Brown"],
              type: "enum"
            },
            {
              name: "Text Value",
              value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam cursus dignissim velit, nec iaculis tellus dapibus nec. Suspendisse volutpat lacus turpis, id aliquet purus scelerisque at. Cras eleifend ullamcorper massa, non molestie nunc finibus in. Cras tincidunt dui sit amet ultrices dictum. Integer tristique varius posuere. In nec orci a metus pharetra dapibus eget ac tellus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus ac ultricies quam. Nam porta at neque pretium faucibus. Cras aliquet tortor dui, in dignissim felis tristique id. Maecenas sed consequat ex.",
              type: "text"
            }
          ]
        },
        {
          title: "Rich Text",
          fields:[
            {
              name: "Rich Text",
              value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam cursus dignissim velit, nec iaculis tellus dapibus nec. Suspendisse volutpat lacus turpis, id aliquet purus scelerisque at. Cras eleifend ullamcorper massa, non molestie nunc finibus in. Cras tincidunt dui sit amet ultrices dictum. Integer tristique varius posuere. In nec orci a metus pharetra dapibus eget ac tellus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus ac ultricies quam. Nam porta at neque pretium faucibus. Cras aliquet tortor dui, in dignissim felis tristique id. Maecenas sed consequat ex.",
              type: "richtext"
            }
          ]
        },
        {
          title: "Misc Types",
          fields:[
            {
              name: "Date Picker",
              value: "",
              type: "date"
            }
          ]
        },
        {
          title: "Font Chooser",
          fields:[
            {
              name: "Configure Font",
              value: "",
              type: "font"
            }
          ]
        }          
      ]
    };

    this.dataTools=new DataTools ();
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