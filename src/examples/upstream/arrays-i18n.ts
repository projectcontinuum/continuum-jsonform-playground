import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

// Upstream registers this with an `i18n: { translate, locale }` config
// (custom "no data"/"add"/delete-dialog copy for the array control). i18n
// isn't part of PlaygroundExample, so only schema/uischema/data are ported.
const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: Array (i18n)',
    schema: {
      type: 'object',
      properties: {
        comments: {
          type: 'array',
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
              enum: {
                type: 'string',
                const: 'foo',
              },
            },
          },
        },
      },
    },
    uischema: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/comments',
          options: {
            showSortButtons: true,
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
