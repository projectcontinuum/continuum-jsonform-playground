import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

// Upstream "generate" example sets schema/uischema to `undefined` so
// JSONForms' `generateJsonSchema`/`generateDefaultUISchema` utilities infer
// both from the sample `personData` object at runtime. Ported here as a
// hand-written schema/uischema matching that same data shape, with a Control
// per top-level (and nested) property.
const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: Generate Both Schemas',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        vegetarian: { type: 'boolean' },
        birthDate: { type: 'string' },
        personalData: {
          type: 'object',
          properties: {
            age: { type: 'integer' },
          },
        },
        postalCode: { type: 'string' },
      },
    },
    uischema: {
      type: 'VerticalLayout',
      elements: [
        { type: 'Control', scope: '#/properties/name' },
        { type: 'Control', scope: '#/properties/vegetarian' },
        { type: 'Control', scope: '#/properties/birthDate' },
        {
          type: 'Control',
          scope: '#/properties/personalData/properties/age',
        },
        { type: 'Control', scope: '#/properties/postalCode' },
      ],
    } as UISchemaElement,
    data: {
      name: 'John Doe',
      vegetarian: false,
      birthDate: '1985-06-02',
      personalData: {
        age: 34,
      },
      postalCode: '12345',
    },
  },
];

export default examples;
