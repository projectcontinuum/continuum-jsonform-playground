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

// Modeled directly on KNIMEWorkflowExecutorNodeModel's real workflowCredentials
// property: an array-of-objects with showSortButtons (3 header icons) whose
// detail is a plain text field plus a nested format:"credential" control.
// This is the combination that exposed the Accordion-header/CredentialRenderer
// crowding bug in the real NodeDialog (see NodeDialog.tsx's Accordion sx rules
// and CredentialRenderer.tsx's Autocomplete sizing).
const workflowCredentialsArray: PlaygroundExample = {
  name: 'Workflow Credentials Array (KNIME Executor)',
  schema: {
    type: 'object',
    properties: {
      workflowCredentials: {
        type: 'array',
        title: 'Workflow Credentials',
        description:
          "Login/password credentials injected into the workflow at runtime via NodePit's --credential flag. Configure a matching entry in KNIME first (right-click workflow -> Workflow Credentials...) - the Name below must exactly match the name configured there.",
        items: {
          type: 'object',
          properties: {
            knimeCredentialName: {
              type: 'string',
              title: 'KNIME Credential Name',
              description: "Must exactly match the name configured in this workflow's own Workflow Credentials dialog in KNIME",
            },
            credential: {
              type: 'string',
              title: 'Credential',
              description: 'Continuum stored credential providing the login and password to inject',
            },
          },
          required: ['knimeCredentialName', 'credential'],
        },
        default: [],
      },
    },
  },
  uischema: {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Control',
        scope: '#/properties/workflowCredentials',
        options: {
          showSortButtons: true,
          detail: {
            type: 'VerticalLayout',
            elements: [
              { type: 'Control', scope: '#/properties/knimeCredentialName' },
              {
                type: 'Control',
                scope: '#/properties/credential',
                options: { format: 'credential', credentialType: 'GENERIC' },
              },
            ],
          },
        },
      },
    ],
  } as UISchemaElement,
  data: {
    workflowCredentials: [
      { knimeCredentialName: 'db_login', credential: '' },
      { knimeCredentialName: 'ftp_login', credential: '' },
    ],
  },
};

// Isolates whether an array's Accordion rendering (triggered purely by
// options.detail, regardless of what's inside it) can itself cause layout
// inflation, independent of CredentialRenderer/fetch behavior - added while
// diagnosing a real-workbench-only bug reported on detail-based arrays that
// don't contain a credential control at all.
const detailArrayNoCredential: PlaygroundExample = {
  name: 'Array With Detail (No Credential)',
  schema: {
    type: 'object',
    properties: {
      plainDetailItems: {
        type: 'array',
        title: 'Plain Detail Items',
        items: {
          type: 'object',
          properties: {
            itemName: { type: 'string', title: 'Item Name' },
            itemValue: { type: 'string', title: 'Item Value' },
          },
        },
        default: [],
      },
    },
  },
  uischema: {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Control',
        scope: '#/properties/plainDetailItems',
        options: {
          showSortButtons: true,
          detail: {
            type: 'VerticalLayout',
            elements: [
              { type: 'Control', scope: '#/properties/itemName' },
              { type: 'Control', scope: '#/properties/itemValue' },
            ],
          },
        },
      },
    ],
  } as UISchemaElement,
  data: {
    plainDetailItems: [
      { itemName: 'first', itemValue: 'a' },
      { itemName: 'second', itemValue: 'b' },
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
  workflowCredentialsArray,
  detailArrayNoCredential,
];
