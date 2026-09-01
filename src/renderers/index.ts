import { materialRenderers } from '@jsonforms/material-renderers';
import { codeEditorTester, CodeEditorControl } from './CodeEditorRenderer';
import { credentialTester, CredentialControl } from './CredentialRenderer';

// Mirrors continuum-workbench/workflow-editor-extension/.../NodeDialog.tsx's `customRenderers`.
export const customRenderers = [
  { tester: codeEditorTester, renderer: CodeEditorControl },
  { tester: credentialTester, renderer: CredentialControl },
  ...materialRenderers,
];
