import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

// Upstream's core content is a redux-middleware-style `onChange` listener
// function (filters validation errors by touched properties) that hooks
// into a dispatch/store — not representable as a static schema/uischema/data
// triple. The schema/data/uischema (uischema is `undefined` upstream, so the
// default auto-generated layout is used) are ported as-is; the onChange
// listener behavior itself is dropped.
const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: On Change Listener',
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          minLength: 1,
        },
        description: {
          type: 'string',
          minLength: 1,
        },
      },
      required: ['name', 'description'],
    },
    uischema: undefined as unknown as UISchemaElement,
    data: {},
  },
];

export default examples;
