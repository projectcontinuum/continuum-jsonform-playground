import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

const schema = {
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
};

const data = {
  name: 'John Doe',
  vegetarian: false,
  birthDate: '1985-06-02',
  personalData: {
    age: 34,
  },
  postalCode: '12345',
};

const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: Layout Vertical',
    schema,
    uischema: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Control',
          label: 'Name',
          scope: '#/properties/name',
        },
        {
          type: 'Control',
          label: 'Birth Date',
          scope: '#/properties/birthDate',
        },
      ],
    } as UISchemaElement,
    data,
  },
  {
    name: 'JSONForms: Layout Horizontal',
    schema,
    uischema: {
      type: 'HorizontalLayout',
      elements: [
        {
          type: 'Control',
          label: 'Name',
          scope: '#/properties/name',
        },
        {
          type: 'Control',
          label: 'Birth Date',
          scope: '#/properties/birthDate',
        },
      ],
    } as UISchemaElement,
    data,
  },
  {
    name: 'JSONForms: Layout Group',
    schema,
    uischema: {
      type: 'Group',
      label: 'My Group',
      elements: [
        {
          type: 'Control',
          label: 'Name',
          scope: '#/properties/name',
        },
        {
          type: 'Control',
          label: 'Birth Date',
          scope: '#/properties/birthDate',
        },
      ],
    } as UISchemaElement,
    data,
  },
  {
    name: 'JSONForms: Layout Complex',
    schema,
    uischema: {
      type: 'Group',
      label: 'My Group',
      elements: [
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'VerticalLayout',
              elements: [
                {
                  type: 'Control',
                  label: 'Name',
                  scope: '#/properties/name',
                },
                {
                  type: 'Control',
                  label: 'Birth Date',
                  scope: '#/properties/birthDate',
                },
              ],
            },
            {
              type: 'VerticalLayout',
              elements: [
                {
                  type: 'Control',
                  label: 'Name',
                  scope: '#/properties/name',
                },
                {
                  type: 'Control',
                  label: 'Birth Date',
                  scope: '#/properties/birthDate',
                },
              ],
            },
          ],
        },
      ],
    } as UISchemaElement,
    data,
  },
];

export default examples;
