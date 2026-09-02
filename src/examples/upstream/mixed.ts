import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

// Upstream `data` is `undefined` (root control on a mixed-type root schema
// with no initial value); kept as `undefined` here.
const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: Mixed',
    schema: {
      $schema: 'http://json-schema.org/draft-07/schema#',
      type: ['string', 'boolean', 'integer', 'null'],
    },
    uischema: {
      type: 'Control',
      scope: '#/',
    } as UISchemaElement,
    data: undefined,
  },
];

export default examples;
