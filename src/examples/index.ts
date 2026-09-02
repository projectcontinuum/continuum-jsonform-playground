import { PlaygroundExample } from './types';

import blank from './builtin/blank';
import basicNode from './builtin/basic-node';
import codeEditorField from './builtin/code-editor-field';
import credentialField from './builtin/credential-field';
import categorization from './builtin/categorization';
import arrayOfObjects from './builtin/array-of-objects';
import workflowCredentialsArray from './builtin/workflow-credentials-array';
import detailArrayNoCredential from './builtin/detail-array-no-credential';

import upstream1884 from './upstream/1884';
import upstream1948 from './upstream/1948';
import additionalErrors from './upstream/additional-errors';
import additionalProperties from './upstream/additional-properties';
import allof from './upstream/allof';
import anyof from './upstream/anyof';
import anyofOneofAllofResolve from './upstream/anyof-oneof-allof-resolve';
import arrays from './upstream/arrays';
import arraysI18n from './upstream/arrays-i18n';
import arraysWithCustomElementLabel from './upstream/arrays-with-custom-element-label';
import arraysWithDefaults from './upstream/arrays-with-defaults';
import arraysWithDetail from './upstream/arrays-with-detail';
import arraysWithDetailAndRule from './upstream/arrays-with-detail-and-rule';
import arraysWithSorting from './upstream/arrays-with-sorting';
import arraysWithTranslatedCustomElementLabel from './upstream/arrays-with-translated-custom-element-label';
import categorizationUpstream from './upstream/categorization';
import categorizationStepper from './upstream/categorization-stepper';
import categorizationStepperNavButtons from './upstream/categorization-stepper-nav-buttons';
import conditionalSchemaCompositions from './upstream/conditional-schema-compositions';
import config from './upstream/config';
import controlOptions from './upstream/control-options';
import dates from './upstream/dates';
import defaultExample from './upstream/default';
import enumExample from './upstream/enum';
import enumI18n from './upstream/enum-i18n';
import enumInArray from './upstream/enum-in-array';
import enumMulti from './upstream/enum-multi';
import enumMultiWithLabelAndDesc from './upstream/enum-multi-with-label-and-desc';
import generateExample from './upstream/generate';
import generateDynamic from './upstream/generate-dynamic';
import generateUi from './upstream/generate-ui';
import huge from './upstream/huge';
import i18n from './upstream/i18n';
import ifThenElse from './upstream/if-then-else';
import jsonEditor from './upstream/json-editor';
import jsonschema from './upstream/jsonschema';
import layout from './upstream/layout';
import listWithDetail from './upstream/list-with-detail';
import listWithDetailPrimitives from './upstream/list-with-detail-primitives';
import listWithDetailRegistered from './upstream/list-with-detail-registered';
import login from './upstream/login';
import mixed from './upstream/mixed';
import mixedObject from './upstream/mixed-object';
import nestedArrays from './upstream/nested-arrays';
import nestedCategorization from './upstream/nested-categorization';
import numbers from './upstream/numbers';
import objectExample from './upstream/object';
import onChange from './upstream/on-change';
import oneOf from './upstream/one-of';
import oneOfArray from './upstream/one-of-array';
import oneOfRecursive from './upstream/one-of-recursive';
import person from './upstream/person';
import prependAppendSlots from './upstream/prepend-append-slots';
import radioGroup from './upstream/radio-group';
import readonlyExample from './upstream/readonly';
import rule from './upstream/rule';
import ruleInheritance from './upstream/rule-inheritance';
import scope from './upstream/scope';
import specialPropertyNames from './upstream/special-property-names';
import stringExample from './upstream/string';
import stringArray from './upstream/string-array';
import text from './upstream/text';
import validationNestedSameName from './upstream/validation-nested-same-name';

export type { PlaygroundExample };

const BUILTIN_EXAMPLES: PlaygroundExample[] = [
  blank,
  basicNode,
  codeEditorField,
  credentialField,
  categorization,
  arrayOfObjects,
  workflowCredentialsArray,
  detailArrayNoCredential,
];

// Every official JSONForms example (github.com/eclipsesource/jsonforms,
// packages/examples/src/examples), one file per upstream name under
// ./upstream. Each upstream file default-exports a PlaygroundExample[]
// since some upstream files register more than one variant.
const UPSTREAM_EXAMPLES: PlaygroundExample[] = [
  ...upstream1884,
  ...upstream1948,
  ...additionalErrors,
  ...additionalProperties,
  ...allof,
  ...anyof,
  ...anyofOneofAllofResolve,
  ...arrays,
  ...arraysI18n,
  ...arraysWithCustomElementLabel,
  ...arraysWithDefaults,
  ...arraysWithDetail,
  ...arraysWithDetailAndRule,
  ...arraysWithSorting,
  ...arraysWithTranslatedCustomElementLabel,
  ...categorizationUpstream,
  ...categorizationStepper,
  ...categorizationStepperNavButtons,
  ...conditionalSchemaCompositions,
  ...config,
  ...controlOptions,
  ...dates,
  ...defaultExample,
  ...enumExample,
  ...enumI18n,
  ...enumInArray,
  ...enumMulti,
  ...enumMultiWithLabelAndDesc,
  ...generateExample,
  ...generateDynamic,
  ...generateUi,
  ...huge,
  ...i18n,
  ...ifThenElse,
  ...jsonEditor,
  ...jsonschema,
  ...layout,
  ...listWithDetail,
  ...listWithDetailPrimitives,
  ...listWithDetailRegistered,
  ...login,
  ...mixed,
  ...mixedObject,
  ...nestedArrays,
  ...nestedCategorization,
  ...numbers,
  ...objectExample,
  ...onChange,
  ...oneOf,
  ...oneOfArray,
  ...oneOfRecursive,
  ...person,
  ...prependAppendSlots,
  ...radioGroup,
  ...readonlyExample,
  ...rule,
  ...ruleInheritance,
  ...scope,
  ...specialPropertyNames,
  ...stringExample,
  ...stringArray,
  ...text,
  ...validationNestedSameName,
];

export const EXAMPLES: PlaygroundExample[] = [...BUILTIN_EXAMPLES, ...UPSTREAM_EXAMPLES];
