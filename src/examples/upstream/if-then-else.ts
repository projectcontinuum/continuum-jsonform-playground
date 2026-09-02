import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

// Upstream uischema is `undefined` (relies on JSONForms auto-generating a
// default layout for a schema with no explicit uischema). Ported with an
// explicit VerticalLayout containing one Control per property so the
// if/then/else conditional-required behavior (c becomes required when b is
// false) is visibly exercised.
const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: If Then Else',
    schema: {
      type: 'object',
      properties: {
        b: { type: 'boolean' },
        c: { type: 'string', minLength: 1 },
      },
      if: { properties: { b: { enum: [false] } } },
      then: { required: ['c'] },
    },
    uischema: {
      type: 'VerticalLayout',
      elements: [
        { type: 'Control', scope: '#/properties/b' },
        { type: 'Control', scope: '#/properties/c' },
      ],
    } as UISchemaElement,
    data: {},
  },
];

export default examples;
