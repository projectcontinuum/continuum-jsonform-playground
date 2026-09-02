import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

const schema = {
  type: 'object',
  properties: {
    postalCode: {
      type: 'string',
      description: 'A Postal Code',
      maxLength: 5,
    },
    recurrenceInterval: {
      type: 'integer',
      description: 'A recurrence interval',
    },
  },
  required: ['postalCode'],
};

const data = {
  postalCode: '12345',
};

// Upstream demonstrates the same uischema rendered twice, once with a global
// `config` prop (restrict/trim/showUnfocusedDescription/hideRequiredAsterisk)
// passed to <JsonForms>, and once without. PlaygroundExample has no separate
// global "config" concept, so for the "Custom" variant those same option
// flags are baked directly into each Control's own `options` to reproduce
// the equivalent per-control behavior.
const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: Configuration (Default)',
    schema,
    uischema: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/postalCode',
              label: 'Postal Code',
            },
            {
              type: 'Control',
              scope: '#/properties/recurrenceInterval',
              label: 'Recurrence Interval',
            },
          ],
        },
      ],
    } as UISchemaElement,
    data,
  },
  {
    name: 'JSONForms: Configuration (Custom)',
    schema,
    uischema: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/postalCode',
              label: 'Postal Code',
              options: {
                restrict: true,
                trim: true,
                showUnfocusedDescription: true,
                hideRequiredAsterisk: true,
              },
            },
            {
              type: 'Control',
              scope: '#/properties/recurrenceInterval',
              label: 'Recurrence Interval',
              options: {
                restrict: true,
                trim: true,
                showUnfocusedDescription: true,
                hideRequiredAsterisk: true,
              },
            },
          ],
        },
      ],
    } as UISchemaElement,
    data,
  },
];

export default examples;
