import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

const schema = {
  definitions: {
    order: {
      type: 'object',
      properties: {
        customer: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string', format: 'email' },
            department: { type: 'string' },
          },
        },
        title: {
          type: 'string',
          minLength: 5,
          title: 'Official Title',
        },
        ordered: { type: 'boolean' },
        processId: {
          type: 'number',
          minimum: 0,
        },
        assignee: { type: 'string' },
        startDate: {
          type: 'string',
          format: 'date',
        },
        endDate: {
          type: 'string',
          format: 'date',
        },
        status: {
          type: 'string',
          enum: ['unordered', 'planned', 'ordered'],
        },
      },
      required: ['title'],
    },
  },
  type: 'object',
  properties: {
    orders: {
      type: 'array',
      items: {
        $ref: '#/definitions/order',
      },
    },
  },
};

const data = {
  orders: [
    {
      customer: {
        id: '471201',
        name: 'Sirius Cybernetics Corporation',
        department: 'Complaints Division',
      },
      title: '42 killer robots',
      ordered: true,
      processId: '1890004498',
      assignee: 'Philip J. Fry',
      status: 'ordered',
      startDate: '2018-06-01',
      endDate: '2018-08-01',
    },
    {
      customer: {
        id: '471202',
        name: 'Very Big Corporation of America',
      },
      title: '1000 gallons of MomCorp Oil',
      processId: '1890004499',
      assignee: 'Jen Barber',
      startDate: '2018-07-01',
      status: 'planned',
    },
  ],
};

const detail = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'HorizontalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/title',
        },
        {
          type: 'Control',
          scope: '#/properties/processId',
        },
      ],
    },
    {
      type: 'Group',
      label: 'Customer',
      elements: [
        {
          type: 'Control',
          label: 'ID',
          scope: '#/properties/customer/properties/id',
        },
        {
          type: 'Control',
          label: 'Name',
          scope: '#/properties/customer/properties/name',
        },
        {
          type: 'Control',
          label: 'Department',
          scope: '#/properties/customer/properties/department',
        },
      ],
    },
    {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'VerticalLayout',
          elements: [
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/ordered',
                  options: {
                    toggle: true,
                  },
                },
                {
                  type: 'Control',
                  scope: '#/properties/assignee',
                },
              ],
            },
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/startDate',
                },
                {
                  type: 'Control',
                  scope: '#/properties/endDate',
                },
              ],
            },
            {
              type: 'Control',
              scope: '#/properties/status',
            },
          ],
        },
      ],
    },
  ],
};

const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: List With Detail',
    schema,
    uischema: {
      type: 'ListWithDetail',
      scope: '#/properties/orders',
      options: {
        labelRef: '#/items/properties/customer/properties/name',
        detail,
      },
    } as UISchemaElement,
    data,
  },
  {
    name: 'JSONForms: List With Detail (No Label Ref)',
    schema,
    uischema: {
      type: 'ListWithDetail',
      scope: '#/properties/orders',
      options: {
        detail,
      },
    } as UISchemaElement,
    data,
  },
];

export default examples;
