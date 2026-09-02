import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

// Upstream "i18n" example uses a Translator (createTranslator + lodash get +
// ajv-i18n error localization) that resolves Group `i18n: 'basicInfoGroup'`
// and Label `text: 'additionalInformationLabel'` as translation keys via a
// JSONForms i18n context. The playground has no i18n context, so this is
// ported with the resolved English fallback strings written directly as the
// Group `label` and Label `text` instead of translation keys.
const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: Person (i18n)',
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          minLength: 3,
          description: 'Please enter your name',
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
      },
    },
    uischema: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Group',
          label: 'Basic Information',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/name',
            },
            {
              type: 'Control',
              scope: '#/properties/birthDate',
            },
          ],
        },
        {
          type: 'Label',
          text: 'Additional Information',
        },
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/nationality',
            },
            {
              type: 'Control',
              scope: '#/properties/vegetarian',
            },
          ],
        },
      ],
    } as UISchemaElement,
    data: {
      vegetarian: false,
      birthDate: '1985-06-02',
      personalData: {
        age: 34,
      },
      postalCode: '12345',
    },
  },
];

export default examples;
