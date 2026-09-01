import React from 'react';
import { ControlProps, isControl, rankWith } from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { Box, FormHelperText, Typography, useTheme } from '@mui/material';
import Editor from '@monaco-editor/react';

interface CodeEditorRendererProps extends ControlProps {
  options?: {
    format?: string;
    language?: string;
    rows?: number;
  };
}

// Ported from continuum-workbench/workflow-editor-extension/.../CodeEditorRenderer.tsx,
// swapping Theia's injected MonacoEditorWrapper for a standalone @monaco-editor/react instance.
const CodeEditorRenderer: React.FC<CodeEditorRendererProps> = (props) => {
  const { data, handleChange, label, errors, options = {}, visible } = props;

  const muiTheme = useTheme();
  const monacoTheme = muiTheme.palette.mode === 'dark' ? 'vs-dark' : 'light';

  const language = options.language || 'kotlin';
  const rows = options.rows || 15;
  const format = options.format || 'code';

  const [value, setValue] = React.useState<string>(data || '');

  React.useEffect(() => {
    setValue(data || '');
  }, [data]);

  const handleEditorChange = (newValue: string | undefined) => {
    if (newValue !== undefined) {
      setValue(newValue);
      handleChange(props.path, newValue);
    }
  };

  const lineCount = value ? value.split('\n').length : 1;
  const dynamicRows = Math.max(Math.min(lineCount, rows), 1);
  const editorHeight = `${dynamicRows * 20}px`;
  const hasError = errors && errors.length > 0;
  const errorMessage = errors && errors.length > 0 ? errors[0] : undefined;

  if (format !== 'code') {
    return null;
  }

  if (visible === false) {
    return null;
  }

  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      {label && (
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
          {label}
        </Typography>
      )}
      <Box
        sx={{
          border: hasError ? `1px solid ${muiTheme.palette.error.main}` : `1px solid ${muiTheme.palette.divider}`,
          borderRadius: '4px',
          overflow: 'hidden',
          background: muiTheme.palette.background.default,
        }}
      >
        <Editor
          value={value}
          language={language}
          height={editorHeight}
          theme={monacoTheme}
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            formatOnPaste: true,
            formatOnType: true,
            automaticLayout: true,
          }}
          onChange={handleEditorChange}
        />
      </Box>
      {errorMessage && (
        <FormHelperText error={true} sx={{ mt: 1 }}>
          {errorMessage}
        </FormHelperText>
      )}
    </Box>
  );
};

export const CodeEditorControl = withJsonFormsControlProps(CodeEditorRenderer);

export const codeEditorTester = rankWith(
  10,
  (uischema: any) => isControl(uischema) && uischema.options?.format === 'code'
);

export default CodeEditorControl;
