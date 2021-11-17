/**
 *
 */
class DataFactory {

  /**
   *
   */
  getDefaultData () {
    return ([
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
            name: "Hexadecimal Value",
            value: 0x12,
            type: "hex"
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
    ]);
  }  
}

export default DataFactory;
