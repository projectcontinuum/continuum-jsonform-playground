import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

// Upstream demonstrates toggling between `uischema` and `uischemaWithSorting`
// via action buttons; both are functionally identical objects in the
// upstream source, so only the single static uischema is ported here (the
// "Enable/Disable Sorting" actions aren't representable in PlaygroundExample).
const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: Array With Sorting',
    schema: {
      type: 'object',
      properties: {
        comments: {
          type: 'array',
          minItems: 2,
          maxItems: 8,
          items: {
            type: 'object',
            properties: {
              date: {
                type: 'string',
                format: 'date',
              },
              message: {
                type: 'string',
                maxLength: 5,
              },
              enum: {
                type: 'string',
                const: 'foo',
              },
            },
          },
        },
        foo: { type: 'string' },
      },
    },
    uischema: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/foo',
        },
        {
          type: 'Control',
          scope: '#/properties/comments',
          options: {
            showSortButtons: true,
            restrict: true,
          },
        },
      ],
    } as UISchemaElement,
    data: {
      comments: [
        {
          date: new Date(2001, 8, 11).toISOString().substring(0, 10),
          message: 'This is an example message With sorting',
        },
        {
          date: new Date().toISOString().substring(0, 10),
          message: 'Get ready for booohay',
        },
      ],
    },
  },
];

export default examples;
