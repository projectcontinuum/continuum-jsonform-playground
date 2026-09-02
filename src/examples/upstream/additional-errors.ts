import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

// Upstream ports the shared `person.ts` schema/uischema/data and adds a
// button action that pushes synthetic AJV ErrorObjects into `additionalErrors`
// on the <JsonForms> instance. There is no `additionalErrors` prop or action
// mechanism in PlaygroundExample, so only the underlying Person form itself
// is ported here; the "inject an extra error" interactive demo is dropped.
const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: Additional Errors',
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
        personalData: {
          type: 'object',
          properties: {
            age: {
              type: 'integer',
              description: 'Please enter your age.',
            },
            height: {
              type: 'number',
            },
            drivingSkill: {
              type: 'number',
              maximum: 10,
              minimum: 1,
              default: 7,
            },
          },
          required: ['age', 'height'],
        },
        occupation: {
          type: 'string',
        },
        postalCode: {
          type: 'string',
          maxLength: 5,
        },
      },
      required: ['occupation', 'nationality'],
    },
    uischema: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/name',
            },
            {
              type: 'Control',
              scope: '#/properties/personalData/properties/age',
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
              scope: '#/properties/personalData/properties/height',
            },
            {
              type: 'Control',
              scope: '#/properties/nationality',
            },
            {
              type: 'Control',
              scope: '#/properties/occupation',
              options: {
                suggestion: [
                  'Accountant',
                  'Engineer',
                  'Freelancer',
                  'Journalism',
                  'Physician',
                  'Student',
                  'Teacher',
                  'Other',
                ],
              },
            },
          ],
        },
      ],
    } as UISchemaElement,
    data: {
      name: 'John Doe',
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
