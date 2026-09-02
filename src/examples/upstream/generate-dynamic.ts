import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

// Upstream "generate-dynamic" example registers schema/uischema as undefined
// so JSONForms' schema-generation utilities infer them from `data`, and
// demonstrates swapping `data` at runtime via a registered action. The
// playground has no action mechanism, so this is ported as a static example
// with a hand-written schema/uischema matching the sample data's shape.
const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: Generate Both Schemas - Dynamic Data Change',
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
      },
    },
    uischema: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/name',
        },
      ],
    } as UISchemaElement,
    data: { name: 'bla' },
  },
];

export default examples;
