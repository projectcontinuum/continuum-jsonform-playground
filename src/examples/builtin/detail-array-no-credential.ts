import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

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

export default detailArrayNoCredential;
