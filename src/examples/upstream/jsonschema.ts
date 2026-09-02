import { JsonSchema, UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

// Upstream registers this schema's uischema dynamically: a UISchema registry
// entry (tested via a custom `tester` matching this exact draft-07 meta-schema
// $id) supplies a Categorization (Basic / Structure / Constraints, with a
// stepper variant and per-category SHOW rules keyed off the edited schema's
// `type`), plus two more registry entries that just relabel the `minItems`/
// `maxItems`/array-`type` controls, plus a separate registry entry for when
// the edited schema is of type 'boolean'. It also exposes actions to
// register/unregister that whole uischema registry at runtime. Since
// PlaygroundExample only supports a single static schema/uischema pair (no
// uischema registry, no per-type switching, no actions), this is ported as
// one static uischema: the "object" variant's Categorization (dropping the
// registry tester wrapper, the boolean-schema variant, and the two
// control-relabeling registry entries).
const shouldContainTypeCondition = (type: string[]) => ({
  scope: '#/properties/type',
  schema: {
    anyOf: [
      {
        type: 'string',
        enum: type,
      },
      {
        type: 'array',
        items: {
          type: 'string',
        },
        contains: {
          type: 'string',
          enum: type,
        },
      },
    ],
  },
});

const typeIsSpecifiedCondition = {
  scope: '#/properties/type',
  schema: {
    oneOf: [
      {
        type: 'string',
        enum: ['string', 'number', 'integer', 'array', 'object', 'boolean', 'null'],
      },
      {
        type: 'array',
        items: {
          type: 'string',
          enum: ['string', 'number', 'integer', 'array', 'object', 'boolean', 'null'],
        },
        minItems: 1,
        uniqueItems: true,
      },
    ],
  },
};

const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: JsonSchema',
    schema: {
      $schema: 'http://json-schema.org/draft-07/schema#',
      $id: 'http://json-schema.org/draft-07/schema#',
      title: 'Core schema meta-schema',
      definitions: {
        schemaArray: {
          type: 'array',
          minItems: 1,
          items: { $ref: '#' },
        },
        nonNegativeInteger: {
          type: 'integer',
          minimum: 0,
        },
        nonNegativeIntegerDefault0: {
          allOf: [{ $ref: '#/definitions/nonNegativeInteger' }, { default: 0 }],
        },
        simpleTypes: {
          type: 'string',
          enum: ['array', 'boolean', 'integer', 'null', 'number', 'object', 'string'],
        },
        stringArray: {
          type: 'array',
          items: { type: 'string' },
          uniqueItems: true,
          default: [],
        },
      },
      type: ['object', 'boolean'],
      properties: {
        $id: {
          type: 'string',
          format: 'uri-reference',
        },
        $schema: {
          type: 'string',
          format: 'uri',
        },
        $ref: {
          type: 'string',
          format: 'uri-reference',
        },
        $comment: {
          type: 'string',
        },
        title: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        default: true,
        readOnly: {
          type: 'boolean',
          default: false,
        },
        writeOnly: {
          type: 'boolean',
          default: false,
        },
        examples: {
          type: 'array',
          items: true,
        },
        multipleOf: {
          type: 'number',
          exclusiveMinimum: 0,
        },
        maximum: {
          type: 'number',
        },
        exclusiveMaximum: {
          type: 'number',
        },
        minimum: {
          type: 'number',
        },
        exclusiveMinimum: {
          type: 'number',
        },
        maxLength: { $ref: '#/definitions/nonNegativeInteger' },
        minLength: { $ref: '#/definitions/nonNegativeIntegerDefault0' },
        pattern: {
          type: 'string',
          format: 'regex',
        },
        additionalItems: { $ref: '#' },
        items: {
          anyOf: [{ $ref: '#' }, { $ref: '#/definitions/schemaArray' }],
          default: true,
        },
        maxItems: { $ref: '#/definitions/nonNegativeInteger' },
        minItems: { $ref: '#/definitions/nonNegativeIntegerDefault0' },
        uniqueItems: {
          type: 'boolean',
          default: false,
        },
        contains: { $ref: '#' },
        maxProperties: { $ref: '#/definitions/nonNegativeInteger' },
        minProperties: { $ref: '#/definitions/nonNegativeIntegerDefault0' },
        required: { $ref: '#/definitions/stringArray' },
        additionalProperties: { $ref: '#' },
        definitions: {
          type: 'object',
          additionalProperties: { $ref: '#' },
          default: {},
        },
        properties: {
          type: 'object',
          additionalProperties: { $ref: '#' },
          default: {},
        },
        patternProperties: {
          type: 'object',
          additionalProperties: { $ref: '#' },
          propertyNames: { format: 'regex' },
          default: {},
        },
        dependencies: {
          type: 'object',
          additionalProperties: {
            anyOf: [{ $ref: '#' }, { $ref: '#/definitions/stringArray' }],
          },
        },
        propertyNames: { $ref: '#' },
        const: true,
        enum: {
          type: 'array',
          items: true,
          minItems: 1,
          uniqueItems: true,
        },
        type: {
          anyOf: [
            { $ref: '#/definitions/simpleTypes' },
            {
              type: 'array',
              items: { $ref: '#/definitions/simpleTypes' },
              minItems: 1,
              uniqueItems: true,
            },
          ],
        },
        format: { type: 'string' },
        contentMediaType: { type: 'string' },
        contentEncoding: { type: 'string' },
        if: { $ref: '#' },
        then: { $ref: '#' },
        else: { $ref: '#' },
        allOf: { $ref: '#/definitions/schemaArray' },
        anyOf: { $ref: '#/definitions/schemaArray' },
        oneOf: { $ref: '#/definitions/schemaArray' },
        not: { $ref: '#' },
      },
      default: true,
    } as unknown as JsonSchema,
    uischema: {
      type: 'Categorization',
      elements: [
        {
          type: 'Category',
          label: 'Basic',
          elements: [
            {
              type: 'VerticalLayout',
              elements: [
                { type: 'Control', scope: '#/properties/$id' },
                { type: 'Control', scope: '#/properties/$schema' },
                { type: 'Control', scope: '#/properties/title' },
                { type: 'Control', scope: '#/properties/description' },
              ],
            },
          ],
        },
        {
          type: 'Category',
          label: 'Structure',
          elements: [
            {
              type: 'VerticalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/type',
                  options: {
                    'label-0': 'Single Type',
                    'label-1': 'Multiple Types',
                  },
                },
                {
                  type: 'Categorization',
                  rule: {
                    effect: 'SHOW',
                    condition: shouldContainTypeCondition(['object']),
                  },
                  elements: [
                    {
                      type: 'Category',
                      label: 'Properties',
                      elements: [
                        { type: 'Control', scope: '#/properties/properties' },
                      ],
                    },
                    {
                      type: 'Category',
                      label: 'Required',
                      elements: [
                        { type: 'Control', scope: '#/properties/required' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'Category',
          label: 'Constraints',
          rule: {
            effect: 'SHOW',
            condition: typeIsSpecifiedCondition,
          },
          elements: [
            {
              type: 'Categorization',
              elements: [
                {
                  type: 'Category',
                  label: 'Number',
                  rule: {
                    effect: 'SHOW',
                    condition: shouldContainTypeCondition(['number', 'integer']),
                  },
                  elements: [
                    {
                      type: 'VerticalLayout',
                      elements: [
                        { type: 'Control', scope: '#/properties/multipleOf' },
                        { type: 'Control', scope: '#/properties/maximum' },
                        { type: 'Control', scope: '#/properties/exclusiveMaximum' },
                        { type: 'Control', scope: '#/properties/minimum' },
                        { type: 'Control', scope: '#/properties/exclusiveMinimum' },
                      ],
                    },
                  ],
                },
                {
                  type: 'Category',
                  label: 'String',
                  rule: {
                    effect: 'SHOW',
                    condition: shouldContainTypeCondition(['string']),
                  },
                  elements: [
                    { type: 'Control', scope: '#/properties/maxLength' },
                    { type: 'Control', scope: '#/properties/minLength' },
                    { type: 'Control', scope: '#/properties/pattern' },
                  ],
                },
                {
                  type: 'Category',
                  label: 'Array',
                  rule: {
                    effect: 'SHOW',
                    condition: shouldContainTypeCondition(['array']),
                  },
                  elements: [
                    { type: 'Control', scope: '#/properties/minItems' },
                    { type: 'Control', scope: '#/properties/maxItems' },
                    { type: 'Control', scope: '#/properties/uniqueItems' },
                  ],
                },
                {
                  type: 'Category',
                  label: 'Object',
                  rule: {
                    effect: 'SHOW',
                    condition: shouldContainTypeCondition(['object']),
                  },
                  elements: [
                    { type: 'Control', scope: '#/properties/minProperties' },
                    { type: 'Control', scope: '#/properties/maxProperties' },
                  ],
                },
              ],
            },
          ],
        },
      ],
      options: {
        variant: 'stepper',
        showNavButtons: true,
      },
    } as UISchemaElement,
    data: {
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
        },
        nationality: {
          type: 'string',
          enum: ['DE', 'IT', 'JP', 'US', 'RU', 'Other'],
        },
        personalData: {
          type: 'object',
          properties: {
            age: {
              type: 'integer',
              description: 'Please enter your age.',
            },
            height: {
              type: 'number',
            },
            drivingSkill: {
              type: 'number',
              maximum: 10,
              minimum: 1,
              default: 7,
            },
          },
          required: ['age', 'height'],
        },
        occupation: {
          type: 'string',
        },
        postalCode: {
          type: 'string',
          maxLength: 5,
        },
      },
      required: ['occupation', 'nationality'],
    },
  },
];

export default examples;
