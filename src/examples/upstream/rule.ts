import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

// Upstream's third rule uses a `validate` function (TS closure over
// context.data) rather than a `schema` const/enum match - this is TS-only
// and not expressible as inline JSON per the conditional-visibility
// constraints. It's dropped from the ported uischema (the "Vitamin
// deficiency?" control is omitted); the ENABLE and HIDE rules (both plain
// schema-const conditions) are ported faithfully.
const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: Rule',
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        dead: {
          type: 'boolean',
        },
        kindOfDead: {
          type: 'string',
          enum: ['Zombie', 'Vampire', 'Ghoul'],
        },
        vegetables: {
          type: 'boolean',
        },
        kindOfVegetables: {
          type: 'string',
          enum: ['All', 'Some', 'Only potatoes'],
        },
        vitaminDeficiency: {
          type: 'string',
          enum: ['None', 'Vitamin A', 'Vitamin B', 'Vitamin C'],
        },
      },
    },
    uischema: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Control',
          label: 'Name',
          scope: '#/properties/name',
        },
        {
          type: 'Group',
          elements: [
            {
              type: 'Control',
              label: 'Is Dead?',
              scope: '#/properties/dead',
            },
            {
              type: 'Control',
              label: 'Kind of dead',
              scope: '#/properties/kindOfDead',
              rule: {
                effect: 'ENABLE',
                condition: {
                  scope: '#/properties/dead',
                  schema: {
                    const: true,
                  },
                },
              },
            },
          ],
        },
        {
          type: 'Group',
          elements: [
            {
              type: 'Control',
              label: 'Eats vegetables?',
              scope: '#/properties/vegetables',
            },
            {
              type: 'Control',
              label: 'Kind of vegetables',
              scope: '#/properties/kindOfVegetables',
              rule: {
                effect: 'HIDE',
                condition: {
                  scope: '#/properties/vegetables',
                  schema: {
                    const: false,
                  },
                },
              },
            },
          ],
        },
      ],
    } as UISchemaElement,
    data: {
      name: 'John Doe',
      dead: false,
      vegetables: false,
    },
  },
];

export default examples;
