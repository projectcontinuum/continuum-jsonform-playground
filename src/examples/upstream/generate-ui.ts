import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

// Upstream "generateUI" example provides a literal `personCoreSchema` but
// sets `uischema` to `undefined` so JSONForms' `generateDefaultUISchema`
// utility infers it at runtime. Ported here with a hand-written uischema
// containing a real Control per schema property.
const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: Generate UI Schema',
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          minLength: 3,
          description: 'Please enter your name',
        },
        vegetarian: {
          type: 'boolean',
        },
        birthDate: {
          type: 'string',
          format: 'date',
          description: 'Please enter your birth date.',
        },
        nationality: {
          type: 'string',
          enum: ['DE', 'IT', 'JP', 'US', 'RU', 'Other'],
        },
      },
    },
    uischema: {
      type: 'VerticalLayout',
      elements: [
        { type: 'Control', scope: '#/properties/name' },
        { type: 'Control', scope: '#/properties/vegetarian' },
        { type: 'Control', scope: '#/properties/birthDate' },
        { type: 'Control', scope: '#/properties/nationality' },
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
