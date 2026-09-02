import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: Array With Custom Element Label',
    schema: {
      type: 'object',
      properties: {
        comments: {
          type: 'array',
          title: 'Messages',
          items: {
            type: 'object',
            properties: {
              message1: {
                type: 'string',
              },
              message2: {
                type: 'string',
              },
            },
          },
        },
      },
    },
    uischema: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/comments',
          options: {
            elementLabelProp: 'message2',
            detail: {
              type: 'VerticalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/message1',
                },
                {
                  type: 'Control',
                  scope: '#/properties/message2',
                },
              ],
            },
          },
        },
      ],
    } as UISchemaElement,
    data: {
      comments: [
        {
          message1: 'This is an example message',
          message2: 'This is an example message 2',
        },
        {
          message1: 'Get ready for booohay 1',
          message2: 'Get ready for booohay 2',
        },
      ],
    },
  },
];

export default examples;
