import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

// Upstream registers a per-item-schema detail uischema via the JSONForms
// uischema registry (comment: "detail uischema is registered in example
// itself") rather than inline `options.detail`. The playground has no
// uischema registry, so an equivalent `options.detail` layout for the
// warehouseitem fields is added directly here to reproduce the same detail
// view.
const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: List With Detail (Registered Detail UISchema)',
    schema: {
      definitions: {
        warehouseitem: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            buyer: {
              type: 'object',
              properties: {
                email: { type: 'string', format: 'email' },
                age: { type: 'number' },
              },
            },
            status: {
              type: 'string',
              enum: ['warehouse', 'shipping', 'delivered'],
            },
          },
          required: ['name'],
        },
      },
      type: 'object',
      properties: {
        warehouseitems: {
          type: 'array',
          items: {
            $ref: '#/definitions/warehouseitem',
          },
        },
      },
    },
    uischema: {
      type: 'ListWithDetail',
      scope: '#/properties/warehouseitems',
      options: {
        labelRef: '#/items/properties/name',
        detail: {
          type: 'VerticalLayout',
          elements: [
            { type: 'Control', scope: '#/properties/name' },
            { type: 'Control', scope: '#/properties/buyer/properties/email' },
            { type: 'Control', scope: '#/properties/buyer/properties/age' },
            { type: 'Control', scope: '#/properties/status' },
          ],
        },
      },
    } as UISchemaElement,
    data: {
      warehouseitems: [
        {
          name: 'Fantasy Book',
          buyer: {
            email: 'buyerA@info.org',
            age: 18,
          },
          status: 'warehouse',
        },
        {
          name: 'Boardgame',
          buyer: {
            email: 'buyerB@info.org',
            age: 45,
          },
          status: 'shipping',
        },
        {
          name: 'Energy Drink',
          buyer: {
            email: 'buyerC@info.org',
            age: 90,
          },
          status: 'delivered',
        },
      ],
    },
  },
];

export default examples;
