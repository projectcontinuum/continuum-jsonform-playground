import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: String',
    schema: {
      type: 'string',
      title: 'String',
      description: 'The form output will be a string',
    },
    uischema: {
      type: 'Control',
      scope: '#/',
    } as UISchemaElement,
    data: 'This is a test string',
  },
];

export default examples;
