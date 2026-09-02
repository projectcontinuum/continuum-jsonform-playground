import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: Mixed Object',
    schema: {
      $schema: 'http://json-schema.org/draft-07/schema#',
      title: 'Mixed Types Example',
      type: 'object',
      properties: {
        mixedSimple: {
          type: ['string', 'boolean', 'integer'],
          description: 'This property can be a string, boolean, or integer.',
        },
        nullableString: {
          type: ['string', 'null'],
        },
        nullableObject: {
          type: ['object', 'null'],
          description:
            'A nullable object whose properties should still be rendered.',
          properties: {
            shape: {
              type: 'string',
            },
            size: {
              type: 'number',
            },
          },
        },
        mixed: {
          type: [
            'array',
            'boolean',
            'integer',
            'null',
            'number',
            'object',
            'string',
          ],
        },
      },
      required: ['mixedSimple'],
    },
    uischema: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/mixedSimple',
        },
        {
          type: 'Control',
          scope: '#/properties/nullableString',
        },
        {
          type: 'Control',
          scope: '#/properties/nullableObject',
        },
        {
          type: 'Control',
          scope: '#/properties/mixed',
        },
      ],
    } as UISchemaElement,
    data: {
      mixedSimple: 'String',
      nullableString: null,
      nullableObject: {
        shape: 'circle',
        size: 5,
      },
    },
  },
];

export default examples;
