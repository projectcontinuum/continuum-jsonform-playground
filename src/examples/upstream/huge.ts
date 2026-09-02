import { UISchemaElement } from '@jsonforms/core';
import { PlaygroundExample } from '../types';

// Upstream "huge" is the GEDCOM X genealogy schema used to stress-test a
// `Categorization` with `ListWithDetail` tabs over deeply cross-referenced
// (`allOf`/`anyOf`/`$ref`) definitions. The original has 8 category tabs
// (Persons, Relationships, SourceDescriptions, Agents, Events, Documents,
// Places, Generic) backed by 49 schema `definitions`. Only 4 tabs are kept
// here (Persons, Relationships, Documents, Generic), which reduces the
// required definitions to 33 (dropping textValue, sourceCitation,
// onlineAccount, address, eventRole(Types), coverage, groupRole,
// sourceDescription, resourceTypes, agent, event(Types), placeDescription,
// group). Two very long enums were also trimmed: `personFactTypes`
// (60 -> 6 values) and `namePartQualifierNames` (16 -> 4 values).
const schema = {
  $schema: 'http://json-schema.org/schema#',

  definitions: {
    confidenceTypes: {
      type: 'string',
      enum: [
        'http://gedcomx.org/High',
        'http://gedcomx.org/Medium',
        'http://gedcomx.org/Low',
      ],
    },
    genderTypes: {
      type: 'string',
      enum: [
        'http://gedcomx.org/Male',
        'http://gedcomx.org/Female',
        'http://gedcomx.org/Unknown',
        'http://gedcomx.org/Intersex',
      ],
    },
    nameTypes: {
      type: 'string',
      enum: [
        'http://gedcomx.org/BirthName',
        'http://gedcomx.org/MarriedName',
        'http://gedcomx.org/AlsoKnownAs',
        'http://gedcomx.org/Nickname',
        'http://gedcomx.org/AdoptiveName',
        'http://gedcomx.org/FormalName',
        'http://gedcomx.org/ReligiousName',
      ],
    },
    namePartTypes: {
      enum: [
        'http://gedcomx.org/Prefix',
        'http://gedcomx.org/Suffix',
        'http://gedcomx.org/Given',
        'http://gedcomx.org/Surname',
      ],
    },
    // Trimmed from ~60 values to 6 representative ones.
    personFactTypes: {
      type: 'string',
      enum: [
        'http://gedcomx.org/Birth',
        'http://gedcomx.org/Death',
        'http://gedcomx.org/Marriage',
        'http://gedcomx.org/Residence',
        'http://gedcomx.org/Occupation',
        'http://gedcomx.org/Religion',
      ],
    },
    uri: {
      type: 'string',
    },
    localeTag: {
      type: 'string',
    },
    resourceReference: {
      type: 'object',
      properties: {
        resource: { $ref: '#/definitions/uri' },
      },
    },
    identifier: {
      type: 'object',
    },
    attribution: {
      title: 'Attribution',
      properties: {
        contributor: {
          $ref: '#/definitions/resourceReference',
          description:
            'Reference to the agent to whom the attributed data is attributed.',
        },
        modified: {
          type: 'number',
          description: 'Timestamp of when the attributed data was contributed.',
        },
        changeMessage: {
          type: 'string',
          description:
            'A statement of why the attributed data is being provided by the contributor.',
        },
        creator: {
          $ref: '#/definitions/resourceReference',
          description:
            'Reference to the agent that created the attributed data. The creator MAY be different from the contributor if changes were made to the attributed data.',
        },
        created: {
          type: 'number',
          description: 'Timestamp of when the attributed data was contributed.',
        },
      },
    },
    note: {
      title: 'Note',
      properties: {
        lang: {
          $ref: '#/definitions/localeTag',
          description: 'The locale identifier for the note.',
        },
        subject: {
          type: 'string',
          description: 'A subject or title for the note.',
        },
        text: { type: 'string', description: 'The text of the note.' },
        attribution: {
          $ref: '#/definitions/attribution',
          description: 'The attribution of this note.',
        },
      },
      required: ['text'],
    },
    sourceReference: {
      title: 'SourceReference',
      properties: {
        description: {
          $ref: '#/definitions/uri',
          description: 'Reference to a description of the target source.',
        },
        descriptionId: {
          type: 'string',
          description: 'The id of the target source.',
        },
        attribution: {
          $ref: '#/definitions/attribution',
          description: 'The attribution of this source reference.',
        },
        qualifiers: {
          items: { $ref: '#/definitions/sourceReferenceQualifier' },
          description:
            'Qualifiers for the reference, used to identify specific fragments of the source that are being referenced.',
        },
      },
      required: ['description'],
    },
    sourceReferenceQualifier: {
      properties: {
        name: {
          anyOf: [
            { $ref: '#/definitions/sourceReferenceQualifierNames' },
            { $ref: '#/definitions/uri' },
          ],
        },
        value: { type: 'string' },
      },
      required: ['name'],
    },
    sourceReferenceQualifierNames: {
      enum: [
        'http://gedcomx.org/CharacterRegion',
        'http://gedcomx.org/RectangleRegion',
        'http://gedcomx.org/TimeRegion',
      ],
    },
    evidenceReference: {
      title: 'EvidenceReference',
      properties: {
        resource: { $ref: '#/definitions/uri' },
        attribution: { $ref: '#/definitions/attribution' },
      },
      required: ['resource'],
    },
    conclusion: {
      type: 'object',
      title: 'Conclusion',
      properties: {
        id: {
          type: 'string',
          description: 'An identifier for the conclusion data.',
        },
        lang: {
          $ref: '#/definitions/localeTag',
          description: 'The locale identifier for the conclusion.',
        },
        sources: {
          items: { $ref: '#/definitions/sourceReference' },
          description:
            'The list of references to the sources of related to this conclusion.',
        },
        analysis: {
          $ref: '#/definitions/resourceReference',
          description:
            'Reference to a document containing analysis supporting this conclusion.',
        },
        notes: {
          items: { $ref: '#/definitions/note' },
          description: 'A list of notes about this conclusion.',
        },
        confidence: {
          anyOf: [
            { $ref: '#/definitions/uri' },
            { $ref: '#/definitions/confidenceTypes' },
          ],
          description: 'Reference to a confidence level for this conclusion.',
        },
        attribution: {
          $ref: '#/definitions/attribution',
          description: 'The attribution of this conclusion.',
        },
      },
    },
    subject: {
      title: 'Subject',
      allOf: [
        { $ref: '#/definitions/conclusion' },
        {
          properties: {
            extracted: {
              type: 'boolean',
              description:
                'Whether this subject is to be constrained as an extracted conclusion.',
            },
            evidence: {
              items: { $ref: '#/definitions/evidenceReference' },
              description:
                'References to other subjects that support this subject.',
            },
            media: {
              items: { $ref: '#/definitions/sourceReference' },
              description:
                'References to multimedia resources for this subject, such as photos or videos, intended to provide additional context or illustration for the subject and not considered evidence supporting the identity of the subject or its supporting conclusions.',
            },
            identifiers: {
              $ref: '#/definitions/identifier',
              description: 'A list of identifiers for the subject.',
            },
          },
        },
      ],
    },
    gender: {
      allOf: [
        { $ref: '#/definitions/conclusion' },
        {
          properties: {
            type: {
              anyOf: [
                { $ref: '#/definitions/uri' },
                { $ref: '#/definitions/genderTypes' },
              ],
              description: 'Enumerated value identifying the gender.',
            },
          },
          required: ['type'],
        },
      ],
    },
    date: {
      type: 'object',
      properties: {
        original: {
          type: 'string',
          description:
            'The original value of the date as supplied by the contributor.',
        },
        formal: {
          type: 'string',
          description:
            'The standardized formal value of the date, formatted according to the GEDCOM X Date Format specification.',
        },
      },
    },
    name: {
      title: 'Name',
      allOf: [
        { $ref: '#/definitions/conclusion' },
        {
          properties: {
            type: {
              anyOf: [
                { $ref: '#/definitions/uri' },
                { $ref: '#/definitions/nameTypes' },
              ],
              description: 'Enumerated value identifying the name type.',
            },
            date: {
              $ref: '#/definitions/date',
              description: 'The date of applicability of the name.',
            },
            nameForms: {
              items: {
                $ref: '#/definitions/nameForm',
              },
              description:
                "The name form(s) that best express this name, usually representations considered proper and well formed in the person's native, historical cultural context.",
            },
          },
          required: ['nameForms'],
        },
      ],
    },
    namePart: {
      title: 'NamePart',
      description:
        'The NamePart data type is used to model a portion of a full name, including the terms that make up that portion. Some name parts may have qualifiers to provide additional semantic meaning to the name part (e.g., "given name" or "surname").',
      properties: {
        type: {
          anyOf: [
            { $ref: '#/definitions/uri' },
            { $ref: '#/definitions/namePartTypes' },
          ],
          description:
            'Enumerated value identifying the type of the name part.',
        },
        value: {
          type: 'string',
          description: 'The term(s) from the name that make up this name part.',
        },
        qualifiers: {
          items: { $ref: '#/definitions/namePartQualifier' },
          description:
            'Qualifiers to add additional semantic meaning to the name part.',
        },
      },
      required: ['value'],
    },
    namePartQualifier: {
      properties: {
        name: {
          anyOf: [
            { $ref: '#/definitions/namePartQualifierNames' },
            { $ref: '#/definitions/uri' },
          ],
        },
        value: { type: 'string' },
      },
      required: ['name'],
    },
    // Trimmed from 16 values to 4 representative ones.
    namePartQualifierNames: {
      enum: [
        'http://gedcomx.org/Title',
        'http://gedcomx.org/Primary',
        'http://gedcomx.org/Middle',
        'http://gedcomx.org/Maiden',
      ],
    },
    nameForm: {
      title: 'NameForm',
      description:
        'The NameForm data type defines a representation of a name (a "name form") within a given cultural context, such as a given language and script.',
      properties: {
        lang: {
          $ref: '#/definitions/localeTag',
          description: 'The locale identifier for the name form.',
        },
        fullText: {
          type: 'string',
          description:
            'A full rendering of the name (or as much of the name as is known).',
        },
        parts: {
          items: {
            $ref: '#/definitions/namePart',
          },
          description: 'Any identified name parts from the name.',
        },
      },
    },
    fact: {
      title: 'PersonFact',
      allOf: [
        { $ref: '#/definitions/conclusion' },
        {
          properties: {
            type: {
              anyOf: [
                { $ref: '#/definitions/uri' },
                { $ref: '#/definitions/personFactTypes' },
              ],
              description: 'Enumerated value identifying the type of the fact.',
            },
            date: {
              $ref: '#/definitions/date',
              description: 'The date of applicability of the fact.',
            },
            place: {
              $ref: '#/definitions/placeReference',
              description: 'A reference to the place applicable to this fact.',
            },
            value: { type: 'string', description: 'The value of the fact.' },
            qualifiers: {
              items: { $ref: '#/definitions/factQualifier' },
              description:
                'Qualifiers to add additional details about the fact.',
            },
          },
          required: ['type'],
        },
      ],
    },
    factQualifier: {
      properties: {
        name: {
          anyOf: [
            { $ref: '#/definitions/factQualifierNames' },
            { $ref: '#/definitions/uri' },
          ],
        },
        value: { type: 'string' },
      },
      required: ['name'],
    },
    factQualifierNames: {
      enum: [
        'http://gedcomx.org/Age',
        'http://gedcomx.org/Cause',
        'http://gedcomx.org/Religion',
        'http://gedcomx.org/Transport',
        'http://gedcomx.org/NonConsensual',
      ],
    },
    placeReference: {
      type: 'object',
      properties: {
        original: {
          type: 'string',
          description:
            'The original place name text as supplied by the contributor.',
        },
        description: {
          $ref: '#/definitions/uri',
          description: 'A reference to a description of this place.',
        },
      },
    },
    person: {
      title: 'Person',
      allOf: [
        { $ref: '#/definitions/subject' },
        {
          properties: {
            private: {
              type: 'boolean',
              description:
                'Whether this instance of Person has been designated for limited distribution or display.',
            },
            gender: {
              $ref: '#/definitions/gender',
              description: 'The sex of the person as assigned at birth.',
            },
            names: {
              items: { $ref: '#/definitions/name' },
              description: 'The names of the person.',
            },
            facts: {
              items: { $ref: '#/definitions/fact' },
              description: 'The facts of the person.',
            },
          },
        },
      ],
    },
    relationship: {
      allOf: [
        { $ref: '#/definitions/subject' },
        {
          properties: {
            type: {
              anyOf: [
                { $ref: '#/definitions/relationshipType' },
                { $ref: '#/definitions/uri' },
              ],
              description:
                'Enumerated value identifying the type of the relationship.',
            },
            person1: {
              $ref: '#/definitions/resourceReference',
              description: 'Reference to the first person in the relationship.',
            },
            person2: {
              $ref: '#/definitions/resourceReference',
              description:
                'Reference to the second person in the relationship.',
            },
            facts: {
              items: { $ref: '#/definitions/fact' },
              description: 'The facts about the relationship.',
            },
          },
          required: ['person1', 'person2'],
        },
      ],
    },
    relationshipType: {
      enum: [
        'http://gedcomx.org/Couple',
        'http://gedcomx.org/ParentChild',
        'http://gedcomx.org/EnslavedBy',
      ],
    },
    document: {
      title: 'Document',
      allOf: [
        { $ref: '#/definitions/conclusion' },
        {
          properties: {
            type: {
              anyOf: [
                { $ref: '#/definitions/documentTypes' },
                { $ref: '#/definitions/uri' },
              ],
            },
            extracted: { type: 'boolean' },
            textType: { type: 'string' },
            text: { type: 'string' },
            attribution: { $ref: '#/definitions/attribution' },
          },
          required: ['text'],
        },
      ],
    },
    documentTypes: {
      enum: [
        'http://gedcomx.org/Abstract',
        'http://gedcomx.org/Transcription',
        'http://gedcomx.org/Translation',
        'http://gedcomx.org/Analysis',
      ],
    },
  },

  type: 'object',
  properties: {
    persons: {
      type: 'array',
      items: { $ref: '#/definitions/person' },
    },
    relationships: {
      type: 'array',
      items: { $ref: '#/definitions/relationship' },
    },
    documents: {
      type: 'array',
      items: { $ref: '#/definitions/document' },
    },
    description: { $ref: '#/definitions/uri' },
    id: { type: 'string' },
    lang: { $ref: '#/definitions/localeTag' },
    attribution: { $ref: '#/definitions/attribution' },
  },
};

const data: any = {
  attribution: {
    contributor: {
      resource: '#A-1',
    },
    modified: 1398405600000,
  },
  persons: [
    {
      names: [
        {
          nameForms: [
            {
              fullText: 'Samuel Ham',
            },
          ],
        },
      ],
      gender: {
        type: 'http://gedcomx.org/Male',
      },
      facts: [
        {
          type: 'http://gedcomx.org/Residence',
          date: {
            original: '3 November 1828',
            formal: '+1828-11-03',
          },
          place: {
            original: 'parish of Honiton, Devon, England',
          },
        },
      ],
      extracted: true,
      sources: [
        {
          description: '#S-2',
        },
      ],
      id: 'P-1',
    },
    {
      names: [
        {
          nameForms: [
            {
              fullText: 'Elizabeth Spiller',
            },
          ],
        },
      ],
      gender: {
        type: 'http://gedcomx.org/Female',
      },
      facts: [
        {
          type: 'http://gedcomx.org/Residence',
          date: {
            original: '3 November 1828',
            formal: '+1828-11-03',
          },
          place: {
            original: 'parish of Wilton, Somerset, England',
          },
        },
      ],
      extracted: true,
      sources: [
        {
          description: '#S-2',
        },
      ],
      id: 'P-2',
    },
    {
      names: [
        {
          nameForms: [
            {
              fullText: 'Jno. Pain',
            },
          ],
        },
      ],
      extracted: true,
      sources: [
        {
          description: '#S-2',
        },
      ],
      id: 'P-3',
    },
  ],
  relationships: [
    {
      type: 'http://gedcomx.org/Couple',
      extracted: true,
      facts: [
        {
          type: 'http://gedcomx.org/Marriage',
          date: {
            original: '3 November 1828',
            formal: '+1828-11-03',
          },
          place: {
            original: 'Wilton St George, Wilton, Somerset, England',
          },
        },
      ],
      person1: {
        resource: '#P-1',
      },
      person2: {
        resource: '#P-2',
      },
    },
  ],
  documents: [
    {
      type: 'http://gedcomx.org/Transcription',
      text: 'Samuel Ham of the parish of Honiton and Elizabeth Spiller\nwere married this 3rd day of November 1828 by David Smith\nStone, Pl Curate,\nIn the Presence of\nJno Pain.\nR.G. Halls.  Peggy Hammet.\nNo. 86.',
      sources: [
        {
          description: '#S-1',
        },
      ],
      lang: 'en',
      id: 'D-1',
    },
    {
      text: '...Jane Doe`s analysis document...',
      id: 'D-2',
    },
  ],
};

const uischema = {
  type: 'Categorization',
  elements: [
    {
      type: 'Category',
      label: 'Persons',
      elements: [{ type: 'ListWithDetail', scope: '#/properties/persons' }],
    },
    {
      type: 'Category',
      label: 'Relationships',
      elements: [
        { type: 'ListWithDetail', scope: '#/properties/relationships' },
      ],
    },
    {
      type: 'Category',
      label: 'Documents',
      elements: [{ type: 'ListWithDetail', scope: '#/properties/documents' }],
    },
    {
      type: 'Category',
      label: 'Generic',
      elements: [
        { type: 'Control', scope: '#/properties/description' },
        { type: 'Control', scope: '#/properties/lang' },
        { type: 'Control', scope: '#/properties/attribution' },
        { type: 'Control', scope: '#/properties/id' },
      ],
    },
  ],
};

const examples: PlaygroundExample[] = [
  {
    name: 'JSONForms: Huge',
    schema,
    uischema: uischema as UISchemaElement,
    data,
  },
];

export default examples;
