import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

const blank: PlaygroundExample = {
  name: 'Blank',
  schema: { type: 'object', properties: {} },
  uischema: { type: 'VerticalLayout', elements: [] } as UISchemaElement,
  data: {},
};

export default blank;
