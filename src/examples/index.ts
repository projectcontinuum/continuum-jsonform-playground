import { JsonSchema, UISchemaElement } from '@jsonforms/core';

export interface PlaygroundExample {
  name: string;
  schema: JsonSchema;
  uischema: UISchemaElement;
  data: any;
}

const blank: PlaygroundExample = {
  name: 'Blank',
  schema: { type: 'object', properties: {} },
  uischema: { type: 'VerticalLayout', elements: [] } as UISchemaElement,
  data: {},
};

const basicNode: PlaygroundExample = {
  name: 'Basic Continuum Node',
  schema: {
    type: 'object',
    properties: {
      name: { type: 'string', title: 'Name' },
      threshold: { type: 'number', title: 'Threshold' },
      enabled: { type: 'boolean', title: 'Enabled' },
      mode: { type: 'string', title: 'Mode', enum: ['FAST', 'ACCURATE', 'BALANCED'] },
    },
    required: ['name'],
  },
  uischema: {
    type: 'VerticalLayout',
    elements: [
      { type: 'Control', scope: '#/properties/name' },
      { type: 'Control', scope: '#/properties/threshold' },
      { type: 'Control', scope: '#/properties/enabled' },
      { type: 'Control', scope: '#/properties/mode' },
    ],
  } as UISchemaElement,
  data: { name: '', threshold: 10, enabled: true, mode: 'BALANCED' },
};

const codeEditorField: PlaygroundExample = {
  name: 'Code Editor Field',
  schema: {
    type: 'object',
    properties: {
      script: { type: 'string', title: 'Transform Script' },
    },
  },
  uischema: {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Control',
        scope: '#/properties/script',
        options: { format: 'code', language: 'kotlin', rows: 12 },
      },
    ],
  } as UISchemaElement,
  data: {
    script: 'override fun execute(properties: Map<String, Any>?): NodeResult {\n    // TODO\n}',
  },
};

const credentialField: PlaygroundExample = {
  name: 'Credential Field',
  schema: {
    type: 'object',
    properties: {
      apiCredential: { type: 'string', title: 'API Credential' },
    },
    required: ['apiCredential'],
  },
  uischema: {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Control',
        scope: '#/properties/apiCredential',
        options: { format: 'credential', credentialType: 'TOKEN' },
      },
    ],
  } as UISchemaElement,
  data: {},
};

const categorization: PlaygroundExample = {
  name: 'Categorization / Tabs',
  schema: {
    type: 'object',
    properties: {
      name: { type: 'string', title: 'Name' },
      description: { type: 'string', title: 'Description' },
      maximumAttempts: { type: 'integer', title: 'Maximum Attempts' },
      backoffCoefficient: { type: 'number', title: 'Backoff Coefficient' },
    },
  },
  uischema: {
    type: 'Categorization',
    elements: [
      {
        type: 'Category',
        label: 'General',
        elements: [
          { type: 'Control', scope: '#/properties/name' },
          { type: 'Control', scope: '#/properties/description' },
        ],
      },
      {
        type: 'Category',
        label: 'Retry Policy',
        elements: [
          { type: 'Control', scope: '#/properties/maximumAttempts' },
          { type: 'Control', scope: '#/properties/backoffCoefficient' },
        ],
      },
    ],
  } as UISchemaElement,
  data: { name: '', description: '', maximumAttempts: 3, backoffCoefficient: 2.0 },
};

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

export const EXAMPLES: PlaygroundExample[] = [
  blank,
  basicNode,
  codeEditorField,
  credentialField,
  categorization,
  arrayOfObjects,
];
