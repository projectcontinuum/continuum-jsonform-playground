import { JsonSchema, UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

// Upstream uses the modern `$defs` keyword (2019-09+ JSON Schema), which
// isn't modeled by the older JsonSchema4/JsonSchema7 union types this repo's
// JsonSchema type resolves to; cast through `unknown` to keep the literal
// structure faithful to upstream.
const schema = {
  $defs: {
    Base: {
      type: 'object',
      properties: {
        width: {
          type: 'integer',
        },
      },
    },
    Child: {
      type: 'object',
      allOf: [
        { $ref: '#/$defs/Base' },
        {
          properties: {
            geometry: {
              type: 'string',
            },
          },
        },
      ],
    },
  },
  type: 'object',
  properties: {
    element: {
      $ref: '#/$defs/Child',
    },
  },
} as unknown as JsonSchema;

const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: AnyOf OneOf AllOf Resolve',
    schema,
    uischema: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Label',
          text: 'AllOfRenderer',
        },
        {
          type: 'Control',
          scope: '#/properties/element',
        },
        {
          type: 'Label',
          text: 'Manual controls',
        },
        {
          type: 'Control',
          scope: '#/properties/element/properties/width',
        },
        {
          type: 'Control',
          scope: '#/properties/element/properties/geometry',
        },
      ],
    } as UISchemaElement,
    data: {},
  },
];

export default examples;
