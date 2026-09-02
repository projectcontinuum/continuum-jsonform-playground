import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: Numbers',
    schema: {
      type: 'object',
      properties: {
        price: {
          type: 'number',
          maximum: 100,
          minimum: 1,
          default: 50,
        },
        age: {
          type: 'integer',
        },
        height: {
          type: 'number',
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
              scope: '#/properties/price',
              label: {
                text: 'Price',
              },
            },
            {
              type: 'Control',
              scope: '#/properties/age',
            },
            {
              type: 'Control',
              scope: '#/properties/height',
              options: {
                step: 1e-2,
              },
            },
            {
              type: 'Control',
              scope: '#/properties/price',
              label: {
                text: 'Price with Slider',
              },
              options: { slider: true },
            },
          ],
        },
      ],
    } as UISchemaElement,
    data: {},
  },
];

export default examples;
