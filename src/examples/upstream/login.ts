import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: Login Form',
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          description: 'Login Name',
        },
        password: {
          type: 'string',
          format: 'password',
          description: 'Login password',
        },
      },
      required: ['username', 'password'],
    },
    uischema: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Label',
          text: 'Login Information',
        },
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/username',
            },
            {
              type: 'Control',
              scope: '#/properties/password',
            },
          ],
        },
      ],
    } as UISchemaElement,
    data: {
      username: 'john.doe@email.com',
    },
  },
];

export default examples;
