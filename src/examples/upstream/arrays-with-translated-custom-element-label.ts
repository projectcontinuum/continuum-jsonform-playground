import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

// Upstream registers this with an `i18n: { translate, locale }` config that
// exercises translated enum/oneOf element labels; i18n isn't part of
// PlaygroundExample so only the schema/uischema/data are ported (the Group
// labels and Control/ListWithDetail elementLabelProp scopes remain intact).
const detail = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/visibility',
    },
    {
      type: 'Control',
      scope: '#/properties/status',
    },
    {
      type: 'Control',
      scope: '#/properties/author/properties/name',
    },
    {
      type: 'Control',
      scope: '#/properties/author/properties/type',
    },
    {
      type: 'Control',
      scope: '#/properties/author/properties/role',
    },
  ],
};

const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: Array With Translated Custom Element Label',
    schema: {
      type: 'object',
      properties: {
        article: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
            },
            comments: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  visibility: {
                    type: 'string',
                    enum: ['PUBLIC', 'PRIVATE'],
                  },
                  status: {
                    type: 'string',
                    oneOf: [
                      {
                        const: 'NEW',
                      },
                      {
                        const: 'REVIEWED',
                        title: 'Reviewed comment',
                      },
                    ],
                  },
                  author: {
                    type: 'object',
                    properties: {
                      name: {
                        type: 'string',
                      },
                      type: {
                        type: 'string',
                        enum: ['AUTHOR', 'WRITER'],
                      },
                      role: {
                        type: 'string',
                        oneOf: [
                          {
                            const: 'ROLE_1',
                          },
                          {
                            const: 'ROLE_2',
                            title: 'Second role',
                          },
                        ],
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    uischema: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Group',
          label:
            'Standard array control with elementLabelProp pointing on an direct enum (expected translated PUBLIC/PRIVATE)',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/article/properties/comments',
              options: {
                elementLabelProp: 'visibility',
                detail: detail,
              },
            },
          ],
        },
        {
          type: 'Group',
          label:
            'Standard array control with elementLabelProp pointing on an direct oneOf (expected translated NEW/Reviewed comment)',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/article/properties/comments',
              options: {
                elementLabelProp: 'status',
                detail: detail,
              },
            },
          ],
        },
        {
          type: 'Group',
          label:
            'ListWithDetail with elementLabelProp pointing on an direct enum (expected translated PUBLIC/PRIVATE)',
          elements: [
            {
              type: 'ListWithDetail',
              scope: '#/properties/article/properties/comments',
              options: {
                elementLabelProp: 'visibility',
                detail: detail,
              },
            },
          ],
        },
        {
          type: 'Group',
          label:
            'ListWithDetail with elementLabelProp pointing on an direct oneOf (expected translated NEW/Reviewed comment)',
          elements: [
            {
              type: 'ListWithDetail',
              scope: '#/properties/article/properties/comments',
              options: {
                elementLabelProp: 'status',
                detail: detail,
              },
            },
          ],
        },
        {
          type: 'Group',
          label:
            'Standard array control with elementLabelProp pointing on an deep enum (expected translated WRITER/AUTHOR)',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/article/properties/comments',
              options: {
                elementLabelProp: 'author.type',
                detail: detail,
              },
            },
          ],
        },
        {
          type: 'Group',
          label:
            'Standard array control with elementLabelProp pointing on an deep oneOf (expected translated ROLE_1/Second role)',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/article/properties/comments',
              options: {
                elementLabelProp: 'author.role',
                detail: detail,
              },
            },
          ],
        },
        {
          type: 'Group',
          label:
            'ListWithDetail with elementLabelProp pointing on an deep enum (expected translated WRITER/AUTHOR)',
          elements: [
            {
              type: 'ListWithDetail',
              scope: '#/properties/article/properties/comments',
              options: {
                elementLabelProp: 'author.type',
                detail: detail,
              },
            },
          ],
        },
        {
          type: 'Group',
          label:
            'ListWithDetail with elementLabelProp pointing on an deep oneOf (expected translated ROLE_1/Second role)',
          elements: [
            {
              type: 'ListWithDetail',
              scope: '#/properties/article/properties/comments',
              options: {
                elementLabelProp: 'author.role',
                detail: detail,
              },
            },
          ],
        },
      ],
    } as UISchemaElement,
    data: {
      article: {
        title: 'title',
        comments: [
          {
            visibility: 'PUBLIC',
            status: 'NEW',
            author: {
              name: 'John',
              type: 'WRITER',
              role: 'ROLE_1',
            },
          },
          {
            visibility: 'PRIVATE',
            status: 'REVIEWED',
            author: {
              name: 'John',
              type: 'AUTHOR',
              role: 'ROLE_2',
            },
          },
        ],
      },
    },
  },
];

export default examples;
