import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

// Upstream spreads `personCoreSchema.properties` in from person.ts; inlined
// here directly. The "Toggle readonly" action isn't representable in
// PlaygroundExample and is dropped.
const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: Array With Detail',
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
        occupation: { type: 'string' },
        comments: {
          type: 'array',
          description: 'Description for array with details',
          minItems: 2,
          maxItems: 8,
          items: {
            type: 'object',
            properties: {
              date: {
                type: 'string',
                format: 'date',
              },
              message: {
                type: 'string',
                maxLength: 5,
              },
            },
          },
        },
      },
      required: ['occupation', 'nationality'],
    },
    uischema: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/comments',
          options: {
            showSortButtons: true,
            restrict: true,
            detail: {
              type: 'VerticalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/message',
                },
                {
                  type: 'Control',
                  scope: '#/properties/date',
                },
              ],
            },
          },
        },
      ],
    } as UISchemaElement,
    data: {
      comments: [
        {
          date: new Date(2001, 8, 11).toISOString().substring(0, 10),
          message: 'This is an example message',
        },
        {
          date: new Date().toISOString().substring(0, 10),
          message: 'Get ready for booohay',
        },
      ],
    },
  },
];

export default examples;
