import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

// Upstream data is `undefined` (JSON Editor starts empty). Using `{}` here
// since PlaygroundExample requires a concrete `data` value.
const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: JSON Editor',
    schema: {
      type: ['array', 'boolean', 'integer', 'null', 'number', 'object', 'string'],
      additionalProperties: true,
      items: {
        type: ['array', 'boolean', 'integer', 'null', 'number', 'object', 'string'],
      },
    },
    uischema: {
      type: 'Control',
      scope: '#/',
    } as UISchemaElement,
    data: {},
  },
];

export default examples;
