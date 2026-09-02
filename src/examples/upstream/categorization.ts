import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

// Upstream registers this with an `i18n: { translate, locale }` config: the
// first Category's `label: 'categoryLabelKey'` and the second Category's
// `i18n: 'address'` (no literal label) are both resolved via translations
// keyed 'categoryLabelKey' -> 'Basic' and 'address.label' -> 'Address'. Since
// PlaygroundExample has no i18n field, those resolved literal strings are
// used directly as labels here.
const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: Categorization',
    schema: {
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
          minLength: 3,
          description: 'Please enter your first name',
        },
        secondName: {
          type: 'string',
          minLength: 3,
          description: 'Please enter your second name',
        },
        vegetarian: {
          type: 'boolean',
        },
        birthDate: {
          type: 'string',
          format: 'date',
          description: 'Please enter your birth date.',
        },
        nationality: {
          type: 'string',
          enum: ['DE', 'IT', 'JP', 'US', 'RU', 'Other'],
        },
        provideAddress: {
          type: 'boolean',
        },
        address: {
          type: 'object',
          properties: {
            street: {
              type: 'string',
            },
            streetNumber: {
              type: 'string',
            },
            city: {
              type: 'string',
            },
            postalCode: {
              type: 'string',
              maxLength: 5,
            },
          },
        },
        vegetarianOptions: {
          type: 'object',
          properties: {
            vegan: {
              type: 'boolean',
            },
            favoriteVegetable: {
              type: 'string',
              enum: ['Tomato', 'Potato', 'Salad', 'Aubergine', 'Cucumber', 'Other'],
            },
            otherFavoriteVegetable: {
              type: 'string',
            },
          },
        },
      },
    },
    uischema: {
      type: 'Categorization',
      elements: [
        {
          type: 'Category',
          label: 'Basic',
          elements: [
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/firstName',
                },
                {
                  type: 'Control',
                  scope: '#/properties/secondName',
                },
              ],
            },
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/birthDate',
                },
                {
                  type: 'Control',
                  scope: '#/properties/nationality',
                },
              ],
            },
            {
              type: 'Control',
              scope: '#/properties/provideAddress',
            },
            {
              type: 'Control',
              scope: '#/properties/vegetarian',
            },
          ],
        },
        {
          type: 'Category',
          label: 'Address',
          elements: [
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/address/properties/street',
                },
                {
                  type: 'Control',
                  scope: '#/properties/address/properties/streetNumber',
                },
              ],
            },
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/address/properties/city',
                },
                {
                  type: 'Control',
                  scope: '#/properties/address/properties/postalCode',
                },
              ],
            },
          ],
          rule: {
            effect: 'SHOW',
            condition: {
              scope: '#/properties/provideAddress',
              schema: { const: true },
            },
          },
        },
        {
          type: 'Category',
          label: 'Additional',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/vegetarianOptions/properties/vegan',
            },
            {
              type: 'Control',
              scope: '#/properties/vegetarianOptions/properties/favoriteVegetable',
            },
            {
              type: 'Control',
              scope:
                '#/properties/vegetarianOptions/properties/otherFavoriteVegetable',
              rule: {
                effect: 'SHOW',
                condition: {
                  scope:
                    '#/properties/vegetarianOptions/properties/favoriteVegetable',
                  schema: { const: 'Other' },
                },
              },
            },
          ],
          rule: {
            effect: 'SHOW',
            condition: {
              scope: '#/properties/vegetarian',
              schema: { const: true },
            },
          },
        },
      ],
    } as UISchemaElement,
    data: {
      provideAddress: true,
      vegetarian: false,
    },
  },
  {
    name: 'JSONForms: Categorization - Issue 1713',
    schema: {
      type: 'object',
      properties: {
        experiments: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              ID: {
                type: 'string',
              },
            },
            additionalProperties: false,
            additionalItems: false,
          },
        },
      },
      required: ['experiments'],
    },
    uischema: {
      type: 'Categorization',
      elements: [
        {
          type: 'Category',
          label: 'Experiments',
          elements: [
            {
              type: 'ListWithDetail',
              scope: '#/properties/experiments',
              options: {
                labelRef: '#/items/properties/ID',
                detail: {
                  type: 'VerticalLayout',
                  elements: [
                    {
                      type: 'HorizontalLayout',
                      elements: [
                        {
                          type: 'Control',
                          scope: '#/properties/ID',
                        },
                      ],
                    },
                    {
                      type: 'Categorization',
                      elements: [
                        {
                          type: 'Category',
                          label: 'Sequential',
                          elements: [
                            {
                              type: 'VerticalLayout',
                              elements: [
                                {
                                  type: 'Control',
                                  scope: '#/properties/ID',
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              },
            },
          ],
        },
      ],
    } as UISchemaElement,
    data: {
      provideAddress: true,
      vegetarian: false,
    },
  },
];

export default examples;
