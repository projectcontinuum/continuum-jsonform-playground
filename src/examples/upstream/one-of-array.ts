import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: oneOf - Inside array items',
    schema: {
      $schema: 'http://json-schema.org/draft-07/schema#',
      definitions: {
        address: {
          type: 'object',
          properties: {
            street_address: { type: 'string' },
            city: { type: 'string' },
            state: { type: 'string' },
          },
          required: ['street_address', 'city', 'state'],
        },
        user: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            mail: { type: 'string' },
          },
          required: ['name', 'mail'],
        },
      },
      type: 'object',
      properties: {
        name: { type: 'string' },
        addressOrUsers: {
          type: 'array',
          items: {
            oneOf: [
              { $ref: '#/definitions/address' },
              { $ref: '#/definitions/user' },
            ],
          },
        },
      },
    },
    uischema: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/addressOrUsers',
        },
      ],
    } as UISchemaElement,
    data: {
      name: 'test',
      addressOrUsers: [
        {
          street_address: '1600 Pennsylvania Avenue NW',
          city: 'Washington',
          state: 'DC',
        },
        {
          name: 'User',
          mail: 'user@user.user',
        },
      ],
    },
  },
];

export default examples;
