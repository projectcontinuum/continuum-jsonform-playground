import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

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

export default workflowCredentialsArray;
