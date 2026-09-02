import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

// Note: upstream uses a Translator (createTranslator + lodash get) resolving
// keys like `country.DE` -> 'Germany' via the JSONForms i18n context. The
// playground has no i18n context, so the group/control labels below use the
// plain English fallback labels directly instead of translation keys.
const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: Enums (i18n)',
    schema: {
      type: 'object',
      properties: {
        country: {
          type: 'string',
          enum: ['DE', 'IT', 'JP', 'US', 'RU', 'Other'],
        },
        countryNoAutocomplete: {
          type: 'string',
          enum: ['DE', 'IT', 'JP', 'US', 'RU', 'Other'],
        },
        status: {
          type: 'string',
          oneOf: [
            { const: 'pending', title: 'Pending' },
            { const: 'approved', title: 'Approved' },
            { const: 'rejected', title: 'Rejected' },
          ],
        },
      },
    },
    uischema: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Group',
          label: 'Enum with i18n (Autocomplete)',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/country',
              label: 'Country (with autocomplete)',
            },
          ],
        },
        {
          type: 'Group',
          label: 'Enum with i18n (Dropdown)',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/countryNoAutocomplete',
              label: 'Country (dropdown)',
              options: {
                autocomplete: false,
              },
            },
          ],
        },
        {
          type: 'Group',
          label: 'OneOf Enum with i18n',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/status',
              label: 'Status',
            },
          ],
        },
      ],
    } as UISchemaElement,
    data: {
      country: 'DE',
    },
  },
];

export default examples;
