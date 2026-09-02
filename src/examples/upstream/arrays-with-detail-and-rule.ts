import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

// Upstream builds this schema by spreading the shared `personCoreSchema`'s
// properties (name, vegetarian, birthDate, nationality) in from person.ts;
// inlined directly here since this file is standalone.
const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: Array With Detail And Rule',
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
        enableArray: { type: 'boolean' },
        comments: {
          type: 'array',
          title: 'Messages',
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
          scope: '#/properties/occupation',
        },
        {
          type: 'Control',
          scope: '#/properties/enableArray',
        },
        {
          type: 'Control',
          scope: '#/properties/comments',
          rule: {
            effect: 'SHOW',
            condition: {
              type: 'OR',
              conditions: [
                {
                  schema: { const: 'developer' },
                  scope: '#/properties/occupation',
                },
                {
                  schema: { const: true },
                  scope: '/properties/enableArray',
                },
              ],
            },
          },
          options: {
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
      occupation: 'developer',
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
