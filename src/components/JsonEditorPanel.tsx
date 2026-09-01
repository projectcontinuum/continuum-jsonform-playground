import { Box, Paper, Typography } from '@mui/material';
import Editor, { OnMount } from '@monaco-editor/react';

interface JsonEditorPanelProps {
  title: string;
  value: string;
  onChange: (text: string) => void;
  error?: string | null;
  monacoTheme: 'vs-dark' | 'light';
  readOnly?: boolean;
}

export function JsonEditorPanel({ title, value, onChange, error, monacoTheme, readOnly }: JsonEditorPanelProps) {
  const handleMount: OnMount = (editor) => {
    editor.updateOptions({ tabSize: 2 });
  };

  return (
    <Paper
      variant="outlined"
      sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
    >
      <Box sx={{ px: 1.5, py: 0.75, borderBottom: 1, borderColor: 'divider', flexShrink: 0 }}>
        <Typography variant="caption" sx={{ fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>
          {title}
        </Typography>
      </Box>
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <Editor
          language="json"
          theme={monacoTheme}
          value={value}
          onChange={(v) => onChange(v ?? '')}
          onMount={handleMount}
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            readOnly,
            tabSize: 2,
          }}
        />
      </Box>
      {error && (
        <Box sx={{ px: 1.5, py: 0.5, bgcolor: 'error.dark', flexShrink: 0 }}>
          <Typography variant="caption" sx={{ color: 'error.contrastText' }}>
            {error}
          </Typography>
        </Box>
      )}
    </Paper>
  );
}
