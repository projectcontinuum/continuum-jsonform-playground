import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: Array of Strings',
    schema: {
      type: 'object',
      properties: {
        comments: {
          description: 'Description for array of String Type',
          type: 'array',
          items: {
            type: 'string',
            maxLength: 5,
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
        },
      ],
    } as UISchemaElement,
    data: {
      comments: ['one string', 'two strings'],
    },
  },
];

export default examples;
