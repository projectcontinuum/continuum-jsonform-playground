import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: Default',
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          default: 'foo',
        },
        name_noDefault: {
          type: 'string',
        },
        description: {
          type: 'string',
          default: 'bar',
        },
        done: {
          type: 'boolean',
          default: false,
        },
        rating: {
          type: 'integer',
          default: 5,
        },
        cost: {
          type: 'number',
          default: 5.5,
        },
        dueDate: {
          type: 'string',
          format: 'date',
          default: '2019-04-01',
        },
      },
      required: ['name', 'name_noDefault'],
    },
    uischema: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/name',
        },
        {
          type: 'Control',
          scope: '#/properties/name_noDefault',
        },
        {
          type: 'Control',
          label: false,
          scope: '#/properties/done',
        },
        {
          type: 'Control',
          scope: '#/properties/description',
          options: {
            multi: true,
          },
        },
        {
          type: 'Control',
          scope: '#/properties/rating',
        },
        {
          type: 'Control',
          scope: '#/properties/cost',
        },
        {
          type: 'Control',
          scope: '#/properties/dueDate',
        },
      ],
    } as UISchemaElement,
    data: {
      name: 'Send email to Adrian',
      name_noDefault: 'Send email to Adrian',
      description: 'Confirm if you have passed the subject\nHereby ...',
      done: true,
      rating: 1,
      cost: 3.14,
      dueDate: '2019-05-01',
    },
  },
];

export default examples;
