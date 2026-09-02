import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: Readonly examples',
    schema: {
      type: 'object',
      properties: {
        readonly: {
          type: 'string',
          readOnly: true,
        },
        readonlyByUISchema: {
          type: 'string',
        },
        notReadonly: {
          type: 'string',
        },
      },
    },
    uischema: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/readonly',
          label: 'A readonly field',
        },
        {
          type: 'Control',
          scope: '#/properties/readonlyByUISchema',
          label: 'A readonly field by ui schema',
          options: {
            readonly: true,
          },
        },
        {
          type: 'Control',
          scope: '#/properties/notReadonly',
          label: 'A normal field',
        },
      ],
    } as UISchemaElement,
    data: {
      readonly: 'readonly by schema',
      readonlyByUISchema: 'readonly by ui schema',
      notReadonly: 'normal field',
    },
  },
];

export default examples;
