import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: Validation - 3x nested properties with same name',
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'object',
          properties: {
            name: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                },
              },
              required: ['name'],
            },
          },
          required: ['name'],
        },
      },
    },
    uischema: {
      type: 'Control',
      scope: '#/properties/name/properties/name/properties/name',
      label: 'Name',
    } as UISchemaElement,
    data: {
      name: {
        name: {},
      },
    },
  },
];

export default examples;
