import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

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

export default credentialField;
