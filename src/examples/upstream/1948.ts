import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

// Upstream leaves `uischema` literally `undefined` for both variants, to
// demonstrate JSONForms' auto-generated UI schema when none is supplied.
// Our PlaygroundExample type requires a concrete uischema, so we provide the
// equivalent auto-generated VerticalLayout/Control pair that JSONForms would
// derive itself. The "without schema" variant upstream also sets
// `schema: undefined` (relying on schema inferred from data at runtime); we
// keep the same fixed schema here since our type requires one, so in this
// port the two variants render identically.
const schema = {
  type: 'object',
  definitions: {
    import: {
      title: 'Import',
      type: 'object',
      properties: {
        eClass: {
          const: 'http://my_schema/1.0.0#//Import',
        },
        document: {
          type: 'string',
        },
        package: {
          type: 'string',
        },
        prefix: {
          type: 'string',
        },
      },
    },
  },
  properties: {
    import: {
      type: 'array',
      items: {
        $ref: '#/definitions/import',
      },
    },
  },
};

const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/import',
    },
  ],
} as UISchemaElement;

const data = {
  import: [
    {
      document: 'Document1',
      package: 'Package1',
      prefix: 'Prefix',
    },
  ],
};

const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: Issue 1948 - Array Renderer Selection (With Schema)',
    schema,
    uischema,
    data,
  },
  {
    name: 'JSONForms: Issue 1948 - Array Renderer Selection (Without Schema)',
    schema,
    uischema,
    data,
  },
];

export default examples;
