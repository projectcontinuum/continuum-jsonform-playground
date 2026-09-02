import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

// Upstream computes the `date` default via JSONForms' `convertDateToString`
// helper; ported here with a plain ISO-date slice to avoid depending on that
// internal helper.
const todayIso = new Date().toISOString().slice(0, 10);

const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: Array With Defaults',
    schema: {
      definitions: {
        itemsType: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              default: 'foo1',
            },
            name_noDefault: {
              type: 'string',
            },
            description: {
              type: 'string',
              default: 'bar',
            },
            done: {
              type: 'boolean',
              default: false,
            },
            rating: {
              type: 'integer',
              default: 5,
            },
            cost: {
              type: 'number',
              default: 5.5,
            },
            date: {
              type: 'string',
              format: 'date',
              default: todayIso,
            },
          },
        },
        stringDef: { type: 'string', default: 'excellent' },
        numberDef: { type: 'number', default: 10 },
        intDef: { type: 'integer', default: 11 },
        boolDef: { type: 'boolean', default: true },
        arrayDef: { type: 'array', default: ['a', 'b', 'c'] },
      },
      type: 'object',
      properties: {
        objectArray: {
          type: 'array',
          items: {
            $ref: '#/definitions/itemsType',
          },
        },
        stringArray: {
          type: 'array',
          items: {
            type: 'string',
            default: '123',
          },
        },
        objectArrayWithPropertyRefs: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              string1: { $ref: '#/definitions/stringDef' },
              string2: { type: 'string' },
              number: { $ref: '#/definitions/numberDef' },
              int: { $ref: '#/definitions/intDef' },
              bool: { $ref: '#/definitions/boolDef' },
              array: { $ref: '#/definitions/arrayDef' },
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
          scope: '#/properties/objectArray',
        },
        {
          type: 'Control',
          scope: '#/properties/stringArray',
        },
        {
          type: 'Control',
          scope: '#/properties/objectArrayWithPropertyRefs',
        },
      ],
    } as UISchemaElement,
    data: {},
  },
];

export default examples;
