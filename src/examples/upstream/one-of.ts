import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

// Upstream registers 6 variants from this file: 'oneOf', 'oneOf_1265_array',
// 'oneOf_1265_object', 'oneOf_1265_simple', 'oneOf_1273', 'oneOf_1273_simple'.
// All ported below as separate entries; the last four have `uischema:
// undefined` upstream (auto-generated layout).
const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: oneOf',
    schema: {
      $schema: 'http://json-schema.org/draft-07/schema#',
      definitions: {
        address: {
          type: 'object',
          properties: {
            street_address: { type: 'string' },
            city: { type: 'string' },
            state: { type: 'string' },
          },
          required: ['street_address', 'city', 'state'],
          additionalProperties: false,
        },
        user: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            mail: { type: 'string' },
          },
          required: ['name', 'mail'],
          additionalProperties: false,
        },
      },
      type: 'object',
      properties: {
        name: { type: 'string' },
        addressOrUser: {
          oneOf: [
            { $ref: '#/definitions/address' },
            { $ref: '#/definitions/user' },
          ],
        },
      },
      required: ['name'],
    },
    uischema: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/name',
        },
        {
          type: 'Control',
          scope: '#/properties/addressOrUser',
        },
      ],
    } as UISchemaElement,
    data: {
      name: 'test',
      addressOrUser: {
        name: 'User',
        mail: 'mail@example.com',
      },
    },
  },
  {
    name: 'JSONForms: oneOf - Validation for Arrays (Issue 1265)',
    schema: {
      type: 'object',
      properties: {
        coloursOrNumbers: {
          oneOf: [
            { $ref: '#/definitions/colours' },
            { $ref: '#/definitions/numbers' },
            { $ref: '#/definitions/shapes' },
          ],
        },
      },
      definitions: {
        colours: {
          title: 'Colours',
          type: 'array',
          minItems: 1,
          items: {
            title: 'Type',
            type: 'string',
            enum: ['Red', 'Green', 'Blue'],
          },
        },
        numbers: {
          title: 'Numbers',
          type: 'array',
          minItems: 1,
          items: {
            title: 'Type',
            type: 'string',
            enum: ['One', 'Two', 'Three'],
          },
        },
        shapes: {
          title: 'Shapes',
          type: 'array',
          minItems: 1,
          items: {
            title: 'Type',
            type: 'string',
            enum: ['Circle', 'Triangle', 'Square'],
          },
        },
      },
    },
    uischema: undefined as unknown as UISchemaElement,
    data: { coloursOrNumbers: ['Foo'] },
  },
  {
    name: 'JSONForms: oneOf - Validation for Objects (Issue 1265)',
    schema: {
      type: 'object',
      properties: {
        coloursOrNumbers: {
          oneOf: [
            { $ref: '#/definitions/colours' },
            { $ref: '#/definitions/numbers' },
            { $ref: '#/definitions/shapes' },
          ],
        },
      },
      additionalProperties: false,
      definitions: {
        colours: {
          title: 'Colours',
          type: 'object',
          properties: {
            colour: {
              title: 'Type',
              type: 'string',
              enum: ['Red', 'Green', 'Blue'],
            },
          },
          additionalProperties: false,
        },
        numbers: {
          title: 'Numbers',
          type: 'object',
          properties: {
            number: {
              title: 'Type',
              type: 'string',
              enum: ['One', 'Two', 'Three'],
            },
          },
          additionalProperties: false,
        },
        shapes: {
          title: 'Shapes',
          type: 'object',
          properties: {
            shape: {
              title: 'Type',
              type: 'string',
              enum: ['Circle', 'Triangle', 'Square'],
            },
          },
          additionalProperties: false,
        },
      },
    },
    uischema: undefined as unknown as UISchemaElement,
    data: { coloursOrNumbers: { colour: 'Foo' } },
  },
  {
    name: 'JSONForms: oneOf - Validation for Primitives (Issue 1265)',
    schema: {
      type: 'object',
      properties: {
        coloursOrNumbers: {
          oneOf: [
            { $ref: '#/definitions/colours' },
            { $ref: '#/definitions/numbers' },
            { $ref: '#/definitions/shapes' },
          ],
        },
      },
      definitions: {
        colours: {
          title: 'Colours',
          type: 'string',
          enum: ['Red', 'Green', 'Blue'],
        },
        numbers: {
          title: 'Numbers',
          type: 'string',
          enum: ['One', 'Two', 'Three'],
        },
        shapes: {
          title: 'Shapes',
          type: 'string',
          enum: ['Circle', 'Triangle', 'Square'],
        },
      },
    },
    uischema: undefined as unknown as UISchemaElement,
    data: { coloursOrNumbers: 'Foo' },
  },
  {
    name: 'JSONForms: oneOf - Preselection for Objects (Issue 1273)',
    schema: {
      type: 'object',
      properties: {
        quantity: {
          oneOf: [
            { $ref: '#/definitions/unrangedQuantity' },
            { $ref: '#/definitions/rangedQuantity' },
          ],
        },
      },
      definitions: {
        unrangedQuantity: {
          title: 'Value',
          type: 'object',
          properties: {
            value: {
              type: 'number',
            },
            unit: {
              type: 'string',
            },
          },
          required: ['value', 'unit'],
        },
        rangedQuantity: {
          title: 'Range',
          type: 'object',
          properties: {
            valueLow: {
              type: 'number',
            },
            valueHigh: {
              type: 'number',
              maximum: 10,
            },
            unit: {
              type: 'string',
            },
          },
          required: ['valueLow', 'valueHigh', 'unit'],
        },
      },
    },
    uischema: undefined as unknown as UISchemaElement,
    data: {
      quantity: {
        valueLow: 1,
        valueHigh: 100,
        unit: 'kg',
      },
    },
  },
  {
    name: 'JSONForms: oneOf - Preselection for Primitives (Issue 1273)',
    schema: {
      type: 'object',
      properties: {
        quantity: {
          oneOf: [{ type: 'string' }, { type: 'number' }],
        },
      },
    },
    uischema: undefined as unknown as UISchemaElement,
    data: { quantity: 5 },
  },
];

export default examples;
