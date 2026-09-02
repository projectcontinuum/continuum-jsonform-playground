import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: List With Detail Primitive (String)',
    schema: {
      type: 'object',
      properties: {
        'an-array-of-strings': {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
    },
    uischema: {
      type: 'ListWithDetail',
      scope: '#/properties/an-array-of-strings',
    } as UISchemaElement,
    data: {
      'an-array-of-strings': ['foo', 'bar', 'foobar'],
    },
  },
  {
    name: 'JSONForms: List With Detail Primitive (Number)',
    schema: {
      type: 'object',
      properties: {
        'an-array-of-numbers': {
          type: 'array',
          items: {
            type: 'number',
          },
        },
      },
    },
    uischema: {
      type: 'ListWithDetail',
      scope: '#/properties/an-array-of-numbers',
    } as UISchemaElement,
    data: {
      'an-array-of-numbers': [1, 2, 3],
    },
  },
];

export default examples;
