import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

// Upstream's "dynamic strength meter" / "async availability checker" /
// "copy to clipboard" / "dynamic icon + unit indicator" prepend/append slot
// behaviors are implemented via custom React renderer slots registered
// elsewhere in the upstream examples app - not representable in this static
// schema/uischema/data playground format (no custom slot renderers exist
// here). The schema/uischema/data are ported as-is; the slot descriptions
// remain only as `description` text.
const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: Prepend/Append Slots (Basic)',
    schema: {
      type: 'object',
      properties: {
        displayName: {
          type: 'string',
          description: 'Decorative icon',
        },
        password: {
          type: 'string',
          description: 'Dynamic strength meter',
        },
        username: {
          type: 'string',
          maxLength: 20,
          description: 'Availability checker (try "admin" or "user")',
        },
        email: {
          type: 'string',
          format: 'email',
          description: 'Copy to clipboard',
        },
        temperature: {
          type: 'integer',
          minimum: -50,
          maximum: 50,
          description: 'Temperature with dynamic icon and unit (°C)',
        },
      },
    },
    uischema: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Label',
          text: 'Prepend Slot Only',
        },
        {
          type: 'Control',
          scope: '#/properties/displayName',
          options: {
            clearable: false,
          },
        },
        {
          type: 'Control',
          scope: '#/properties/password',
          options: {
            clearable: false,
          },
        },
        {
          type: 'Label',
          text: 'Append Slot Only',
        },
        {
          type: 'Control',
          scope: '#/properties/username',
          options: {
            clearable: false,
          },
        },
        {
          type: 'Control',
          scope: '#/properties/email',
          options: {
            clearable: false,
          },
        },
        {
          type: 'Label',
          text: 'Both Prepend and Append',
        },
        {
          type: 'Control',
          scope: '#/properties/temperature',
          options: {
            clearable: false,
          },
        },
      ],
    } as UISchemaElement,
    data: {
      displayName: 'John Doe',
      password: '',
      username: '',
      email: 'user@example.com',
      temperature: 22,
    },
  },
];

export default examples;
