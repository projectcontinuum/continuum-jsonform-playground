import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

const arrayOfObjects: PlaygroundExample = {
  name: 'Array of Objects',
  schema: {
    type: 'object',
    properties: {
      headers: {
        type: 'array',
        title: 'HTTP Headers',
        items: {
          type: 'object',
          properties: {
            key: { type: 'string', title: 'Key' },
            value: { type: 'string', title: 'Value' },
          },
        },
      },
    },
  },
  uischema: {
    type: 'VerticalLayout',
    elements: [{ type: 'Control', scope: '#/properties/headers' }],
  } as UISchemaElement,
  data: {
    headers: [
      { key: 'Content-Type', value: 'application/json' },
      { key: 'Authorization', value: 'Bearer ...' },
    ],
  },
};

export default arrayOfObjects;
