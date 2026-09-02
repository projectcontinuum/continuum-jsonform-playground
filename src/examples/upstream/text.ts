import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: Text Control Options',
    schema: {
      type: 'object',
      properties: {
        zipCode: {
          type: 'string',
          maxLength: 5,
        },
        zipCodeWithoutTrim: {
          type: 'string',
          maxLength: 5,
        },
        zipCodeWithoutRestrict: {
          type: 'string',
          maxLength: 5,
        },
      },
    },
    uischema: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/zipCode',
              label: 'ZIP Code (with trim and restrict options)',
              options: {
                trim: true,
                restrict: true,
              },
            },
            {
              type: 'Control',
              scope: '#/properties/zipCodeWithoutTrim',
              label: 'ZIP Code (without trimming)',
              options: {
                trim: false,
                restrict: true,
              },
            },
            {
              type: 'Control',
              scope: '#/properties/zipCodeWithoutRestrict',
              label: 'ZIP Code (without restricting)',
              options: {
                trim: true,
                restrict: false,
              },
            },
          ],
        },
      ],
    } as UISchemaElement,
    data: {
      zipCode: '12345',
      zipCodeWithoutTrim: '12345678',
      zipCodeWithoutRestrict: '12345678',
    },
  },
];

export default examples;
