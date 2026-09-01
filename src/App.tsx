import React from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { JsonFormsCore, JsonSchema, UISchemaElement } from '@jsonforms/core';
import { darkTheme, lightTheme } from './theme';
import { EXAMPLES } from './examples';
import { JsonEditorPanel } from './components/JsonEditorPanel';
import { FormPreviewPanel } from './components/FormPreviewPanel';

function safeParse(text: string): { value: any; error: string | null } {
  try {
    return { value: JSON.parse(text), error: null };
  } catch (e) {
    return { value: undefined, error: e instanceof Error ? e.message : 'Invalid JSON' };
  }
}

const resizeHandleSx = {
  width: '6px',
  cursor: 'col-resize',
  bgcolor: 'divider',
};

const resizeHandleHorizontalSx = {
  height: '6px',
  cursor: 'row-resize',
  bgcolor: 'divider',
};

export default function App() {
  const [exampleIndex, setExampleIndex] = React.useState(1);
  const [darkMode, setDarkMode] = React.useState(true);

  const initial = EXAMPLES[exampleIndex];
  const [schemaText, setSchemaText] = React.useState(() => JSON.stringify(initial.schema, null, 2));
  const [uischemaText, setUischemaText] = React.useState(() => JSON.stringify(initial.uischema, null, 2));
  const [dataText, setDataText] = React.useState(() => JSON.stringify(initial.data, null, 2));

  const [schema, setSchema] = React.useState<JsonSchema | undefined>(initial.schema);
  const [uischema, setUischema] = React.useState<UISchemaElement | undefined>(initial.uischema);
  const [data, setData] = React.useState<any>(initial.data);

  const [schemaError, setSchemaError] = React.useState<string | null>(null);
  const [uischemaError, setUischemaError] = React.useState<string | null>(null);
  const [dataError, setDataError] = React.useState<string | null>(null);
  const [errorCount, setErrorCount] = React.useState(0);

  const lastDataEditedBy = React.useRef<'form' | 'editor' | null>(null);

  const applyExample = React.useCallback((index: number) => {
    const example = EXAMPLES[index];
    setExampleIndex(index);
    setSchemaText(JSON.stringify(example.schema, null, 2));
    setUischemaText(JSON.stringify(example.uischema, null, 2));
    setDataText(JSON.stringify(example.data, null, 2));
    setSchema(example.schema);
    setUischema(example.uischema);
    setData(example.data);
    setSchemaError(null);
    setUischemaError(null);
    setDataError(null);
    setErrorCount(0);
  }, []);

  const handleSchemaTextChange = (text: string) => {
    setSchemaText(text);
    const { value, error } = safeParse(text);
    setSchemaError(error);
    if (!error) setSchema(value);
  };

  const handleUischemaTextChange = (text: string) => {
    setUischemaText(text);
    const { value, error } = safeParse(text);
    setUischemaError(error);
    if (!error) setUischema(value);
  };

  const handleDataTextChange = (text: string) => {
    setDataText(text);
    const { value, error } = safeParse(text);
    setDataError(error);
    if (!error) {
      lastDataEditedBy.current = 'editor';
      setData(value);
    }
  };

  const handleFormDataChange = React.useCallback(({ data: newData, errors }: Pick<JsonFormsCore, 'data' | 'errors'>) => {
    lastDataEditedBy.current = 'form';
    setData(newData);
    setErrorCount(errors ? errors.length : 0);
  }, []);

  React.useEffect(() => {
    if (lastDataEditedBy.current === 'form') {
      setDataText(JSON.stringify(data, null, 2));
      setDataError(null);
    }
    lastDataEditedBy.current = null;
  }, [data]);

  const theme = darkMode ? darkTheme : lightTheme;
  const monacoTheme = darkMode ? 'vs-dark' : 'light';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Toolbar variant="dense" sx={{ gap: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, flexShrink: 0 }}>
              Continuum JSONForms Playground
            </Typography>
            <FormControl size="small" sx={{ minWidth: 220 }}>
              <Select value={exampleIndex} onChange={(e) => applyExample(Number(e.target.value))}>
                {EXAMPLES.map((example, index) => (
                  <MenuItem key={example.name} value={index}>
                    {example.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ flex: 1 }} />
            <IconButton onClick={() => setDarkMode((d) => !d)}>
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{ flex: 1, minHeight: 0, p: 1 }}>
          <PanelGroup direction="vertical">
            <Panel defaultSize={50} minSize={20}>
              <PanelGroup direction="horizontal">
                <Panel defaultSize={50} minSize={20}>
                  <JsonEditorPanel
                    title="Schema"
                    value={schemaText}
                    onChange={handleSchemaTextChange}
                    error={schemaError}
                    monacoTheme={monacoTheme}
                  />
                </Panel>
                <PanelResizeHandle style={resizeHandleSx as any} />
                <Panel defaultSize={50} minSize={20}>
                  <JsonEditorPanel
                    title="UI Schema"
                    value={uischemaText}
                    onChange={handleUischemaTextChange}
                    error={uischemaError}
                    monacoTheme={monacoTheme}
                  />
                </Panel>
              </PanelGroup>
            </Panel>
            <PanelResizeHandle style={resizeHandleHorizontalSx as any} />
            <Panel defaultSize={50} minSize={20}>
              <PanelGroup direction="horizontal">
                <Panel defaultSize={50} minSize={20}>
                  <JsonEditorPanel
                    title="Data"
                    value={dataText}
                    onChange={handleDataTextChange}
                    error={dataError}
                    monacoTheme={monacoTheme}
                  />
                </Panel>
                <PanelResizeHandle style={resizeHandleSx as any} />
                <Panel defaultSize={50} minSize={20}>
                  <FormPreviewPanel
                    schema={schema}
                    uischema={uischema}
                    data={data}
                    onDataChange={handleFormDataChange}
                    errorCount={errorCount}
                  />
                </Panel>
              </PanelGroup>
            </Panel>
          </PanelGroup>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
