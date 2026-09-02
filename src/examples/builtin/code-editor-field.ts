import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

const codeEditorField: PlaygroundExample = {
  name: 'Code Editor Field',
  schema: {
    type: 'object',
    properties: {
      script: { type: 'string', title: 'Transform Script' },
    },
  },
  uischema: {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Control',
        scope: '#/properties/script',
        options: { format: 'code', language: 'kotlin', rows: 12 },
      },
    ],
  } as UISchemaElement,
  data: {
    script: 'override fun execute(properties: Map<String, Any>?): NodeResult {\n    // TODO\n}',
  },
};

export default codeEditorField;
