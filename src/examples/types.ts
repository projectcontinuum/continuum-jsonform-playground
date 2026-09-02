import { JsonSchema, UISchemaElement } from '@jsonforms/core';

export interface PlaygroundExample {
  name: string;
  schema: JsonSchema;
  uischema: UISchemaElement;
  data: any;
}
