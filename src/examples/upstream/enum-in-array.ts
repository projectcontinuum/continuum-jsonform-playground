import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: Array Containing Enums',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          plainEnum: {
            type: 'string',
            enum: ['foo', 'bar'],
          },
          oneOfEnum: {
            type: 'string',
            oneOf: [
              { const: 'foo', title: 'Foo' },
              { const: 'bar', title: 'Bar' },
              { const: 'foobar', title: 'FooBar' },
            ],
          },
        },
      },
    },
    uischema: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#',
        },
      ],
    } as UISchemaElement,
    data: [],
  },
];

export default examples;
