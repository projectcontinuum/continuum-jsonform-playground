import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

// Upstream's "Enable/Disable top layout" and "Show/Hide bottom layout"
// actions (which toggle data.toggleTopLayout/toggleBottomLayout via a custom
// action button) aren't representable as a static triple; the rules
// themselves (ENABLE on the root VerticalLayout, SHOW on the nested Group)
// are ported faithfully and can be exercised by editing the data directly.
const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: Rule Inheritance',
    schema: {
      type: 'object',
      properties: {
        toggleTopLayout: {
          type: 'boolean',
        },
        topString: {
          type: 'string',
        },
        middleNumber: {
          type: 'number',
        },
        toggleBottomLayout: {
          type: 'boolean',
        },
        bottomBoolean: {
          type: 'boolean',
        },
      },
    },
    uischema: {
      type: 'VerticalLayout',
      rule: {
        effect: 'ENABLE',
        condition: {
          scope: '#/properties/toggleTopLayout',
          schema: { const: true },
        },
      },
      elements: [
        {
          type: 'Control',
          scope: '#/properties/topString',
        },
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/middleNumber',
            },
            {
              type: 'Group',
              label: 'group',
              rule: {
                effect: 'SHOW',
                condition: {
                  scope: '#/properties/toggleBottomLayout',
                  schema: { const: true },
                },
              },
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/bottomBoolean',
                },
              ],
            },
          ],
        },
      ],
    } as unknown as UISchemaElement,
    data: {
      toggleTopLayout: true,
      toggleBottomLayout: true,
      toggleControl: true,
    },
  },
];

export default examples;
