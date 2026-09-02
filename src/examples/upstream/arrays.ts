import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

// Upstream also demonstrates toggling `uischema`/`uischemaWithSorting` and a
// "Toggle readonly" action; those two uischema objects are identical in the
// upstream source and the actions aren't representable in PlaygroundExample,
// so only the single static uischema is ported here.
const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: Array',
    schema: {
      type: 'object',
      properties: {
        comments: {
          type: 'array',
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
              oneOfEnum: {
                type: 'string',
                oneOf: [{ const: 'foo' }, { const: 'bar' }],
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
            showSortButtons: false,
          },
        },
      ],
    } as UISchemaElement,
    data: {
      comments: [
        {
          date: new Date(2001, 8, 11).toISOString().substring(0, 10),
          message: 'This is an example message',
        },
        {
          date: new Date().toISOString().substring(0, 10),
          message: 'Get ready for booohay',
          oneOfEnum: 'test',
        },
      ],
    },
  },
];

export default examples;
