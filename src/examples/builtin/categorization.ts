import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

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

export default categorization;
