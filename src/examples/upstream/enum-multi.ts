import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: Enum - Multi Selection',
    schema: {
      type: 'object',
      properties: {
        oneOfMultiEnum: {
          type: 'array',
          uniqueItems: true,
          items: {
            oneOf: [
              { const: 'foo', title: 'My Foo' },
              { const: 'bar', title: 'My Bar' },
              { const: 'foobar', title: 'My FooBar' },
            ],
          },
        },
        multiEnum: {
          type: 'array',
          uniqueItems: true,
          items: {
            type: 'string',
            enum: ['foo', 'bar', 'foobar'],
          },
        },
      },
    },
    uischema: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/oneOfMultiEnum',
        },
        {
          type: 'Control',
          scope: '#/properties/multiEnum',
        },
      ],
    } as UISchemaElement,
    data: { oneOfMultiEnum: ['foo'], multiEnum: ['bar'] },
  },
];

export default examples;
