import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: anyOf',
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
        users: {
          type: 'array',
          items: { $ref: '#/definitions/user' },
        },
        addresses: {
          type: 'array',
          items: { $ref: '#/definitions/address' },
        },
      },
      type: 'object',
      properties: {
        addressOrUser: {
          anyOf: [
            { $ref: '#/definitions/address' },
            { $ref: '#/definitions/user' },
          ],
        },
        addressesOrUsers: {
          anyOf: [
            { $ref: '#/definitions/addresses' },
            { $ref: '#/definitions/users' },
          ],
        },
        addressesOrUsersAnyOfItems: {
          type: 'array',
          items: {
            anyOf: [
              { $ref: '#/definitions/addresses' },
              { $ref: '#/definitions/users' },
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
          scope: '#/properties/addressOrUser',
        },
        {
          type: 'Control',
          scope: '#/properties/addressesOrUsers',
          label: 'Addresses or Users (AnyOf Schema)',
        },
        {
          type: 'Control',
          scope: '#/properties/addressesOrUsersAnyOfItems',
          label: 'Addresses or Users (AnyOf Array Items)',
        },
      ],
    } as UISchemaElement,
    data: {
      addressOrUser: {
        street_address: '1600 Pennsylvania Avenue NW',
        city: 'Washington',
        state: 'DC',
      },
    },
  },
  {
    name: 'JSONForms: AnyOf Simple',
    schema: {
      type: 'object',
      properties: {
        foo: {
          anyOf: [{ type: 'string' }, { enum: ['foo', 'bar'] }],
        },
      },
    },
    uischema: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/foo',
        },
      ],
    } as UISchemaElement,
    data: { foo: 'foo' },
  },
];

export default examples;
