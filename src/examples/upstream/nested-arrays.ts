import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

// Upstream also registers a custom nested UI schema resolver (`uischemas`)
// and "Register/Unregister NestedArray UISchema" actions to swap in a
// VerticalLayout for the nested item detail. That resolver-registration
// mechanism isn't representable as a static schema/uischema/data triple, so
// only the base schema/uischema/data (rendered via the default table/array
// renderer) is ported here.
const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: Nested Array',
    schema: {
      definitions: {
        choicesContainer: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            choices: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
        },
      },
      type: 'object',
      properties: {
        exampleArray: {
          type: 'array',
          items: {
            $ref: '#/definitions/choicesContainer',
          },
        },
      },
    },
    uischema: {
      type: 'HorizontalLayout',
      elements: [
        {
          type: 'Control',
          label: {
            text: 'Example Array',
            show: true,
          },
          scope: '#/properties/exampleArray',
        },
      ],
    } as UISchemaElement,
    data: {
      exampleArray: [
        {
          choices: ['This', 'is', 'an', 'example'],
          name: 'Hi there',
        },
      ],
    },
  },
];

export default examples;
