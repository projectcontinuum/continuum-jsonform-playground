import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

// Upstream registers two variants sharing schema/data: 'rootObject' (root
// scope '#') and 'object' (VerticalLayout with a conditional nested-detail
// Control). Both ported below. The 'object' variant's rule uses the legacy
// LEAF/expectedValue condition shape from @jsonforms/core; kept as-is since
// it is still accepted by the rule evaluator.
const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: Object - Root Scope',
    schema: {
      $schema: 'http://json-schema.org/draft-07/schema#',
      type: 'object',
      properties: {
        address: {
          type: 'object',
          properties: {
            street_address: { type: 'string' },
            city: { type: 'string' },
            state: { type: 'string' },
          },
          required: ['street_address', 'city', 'state'],
        },
        user: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            mail: { type: 'string' },
          },
          required: ['name', 'mail'],
        },
      },
    },
    uischema: {
      type: 'Control',
      scope: '#',
    } as UISchemaElement,
    data: {
      address: {
        street_address: '1600 Pennsylvania Avenue NW',
        city: 'Washington',
        state: 'DC',
      },
    },
  },
  {
    name: 'JSONForms: Object',
    schema: {
      $schema: 'http://json-schema.org/draft-07/schema#',
      type: 'object',
      properties: {
        address: {
          type: 'object',
          properties: {
            street_address: { type: 'string' },
            city: { type: 'string' },
            state: { type: 'string' },
          },
          required: ['street_address', 'city', 'state'],
        },
        user: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            mail: { type: 'string' },
          },
          required: ['name', 'mail'],
        },
      },
    },
    uischema: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/address',
        },
        {
          type: 'Control',
          scope: '#/properties/user',
          rule: {
            effect: 'SHOW',
            condition: {
              type: 'LEAF',
              scope: '#/properties/address/properties/state',
              expectedValue: 'DC',
            },
          },
          options: {
            detail: {
              type: 'Group',
              label: 'User Data',
              elements: [
                { type: 'Control', scope: '#/properties/name' },
                {
                  type: 'Control',
                  scope: '#/properties/mail',
                },
              ],
            },
          },
        },
      ],
    } as UISchemaElement,
    data: {
      address: {
        street_address: '1600 Pennsylvania Avenue NW',
        city: 'Washington',
        state: 'DC',
      },
    },
  },
];

export default examples;
