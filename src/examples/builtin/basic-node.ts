import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

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

export default basicNode;
