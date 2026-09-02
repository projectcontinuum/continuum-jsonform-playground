import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: Enums',
    schema: {
      type: 'object',
      properties: {
        plainEnum: {
          type: 'string',
          enum: ['foo', 'bar'],
        },
        plainEnumSet: {
          type: 'string',
          enum: ['foo', 'bar'],
        },
        enumWithError: {
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
        oneOfEnumSet: {
          type: 'string',
          oneOf: [
            { const: 'foo', title: 'Foo' },
            { const: 'bar', title: 'Bar' },
            { const: 'foobar', title: 'FooBar' },
          ],
        },
        oneOfEnumWithError: {
          type: 'string',
          oneOf: [
            { const: 'foo', title: 'Foo' },
            { const: 'bar', title: 'Bar' },
            { const: 'foobar', title: 'FooBar' },
          ],
        },
        constEnum: {
          const: 'Const Value',
        },
      },
    },
    uischema: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Group',
          label: 'Enums',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/constEnum',
            },
            {
              type: 'Control',
              scope: '#/properties/plainEnum',
            },
            {
              type: 'Control',
              scope: '#/properties/plainEnumSet',
            },
            {
              type: 'Control',
              scope: '#/properties/plainEnum',
              options: {
                autocomplete: false,
              },
            },
            {
              type: 'Control',
              scope: '#/properties/plainEnumSet',
              options: {
                autocomplete: false,
              },
            },
            {
              type: 'Control',
              scope: '#/properties/enumWithError',
            },
          ],
        },
        {
          type: 'Group',
          label: 'One of Enums',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/oneOfEnum',
            },
            {
              type: 'Control',
              scope: '#/properties/oneOfEnumSet',
            },
            {
              type: 'Control',
              scope: '#/properties/oneOfEnum',
              options: {
                autocomplete: false,
              },
            },
            {
              type: 'Control',
              scope: '#/properties/oneOfEnumSet',
              options: {
                autocomplete: false,
              },
            },
            {
              type: 'Control',
              scope: '#/properties/oneOfEnumWithError',
            },
          ],
        },
      ],
    } as UISchemaElement,
    data: {
      plainEnumSet: 'foo',
      enumWithError: 'bogus',
      oneOfEnumSet: 'bar',
      oneOfEnumWithError: 'bogus',
    },
  },
];

export default examples;
