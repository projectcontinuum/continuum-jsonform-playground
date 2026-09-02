import React from 'react';
import {
  AppBar,
  Autocomplete,
  Box,
  Chip,
  CircularProgress,
  CssBaseline,
  FormControlLabel,
  IconButton,
  Switch,
  TextField,
  ThemeProvider,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import RefreshIcon from '@mui/icons-material/Refresh';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { JsonFormsCore, JsonSchema, UISchemaElement } from '@jsonforms/core';
import { darkTheme, lightTheme } from './theme';
import { EXAMPLES } from './examples';
import { JsonEditorPanel } from './components/JsonEditorPanel';
import { FormPreviewPanel } from './components/FormPreviewPanel';
import { NodeDialogPreviewModal } from './components/NodeDialogPreviewModal';
import { useNodeCatalog } from './hooks/useNodeCatalog';
import { NodeCatalogEntry } from './types/nodeExplorer';

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

const API_CATALOG_ENABLED_STORAGE_KEY = 'continuum-playground:apiCatalogEnabled';
const API_SERVER_URL_STORAGE_KEY = 'continuum-playground:apiServerUrl';
const DEFAULT_API_SERVER_URL = 'http://localhost:8081';

export default function App() {
  const [exampleIndex, setExampleIndex] = React.useState(1);
  const [darkMode, setDarkMode] = React.useState(true);
  const [dialogPreviewOpen, setDialogPreviewOpen] = React.useState(false);

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

  // Walking the full node-explorer tree is slow, so loading it from the API server is opt-in.
  const [apiCatalogEnabled, setApiCatalogEnabled] = React.useState(
    () => localStorage.getItem(API_CATALOG_ENABLED_STORAGE_KEY) === 'true'
  );
  React.useEffect(() => {
    localStorage.setItem(API_CATALOG_ENABLED_STORAGE_KEY, String(apiCatalogEnabled));
  }, [apiCatalogEnabled]);

  // Configured from the playground UI rather than a build-time env var, so it can be pointed
  // at a different api-server instance without rebuilding.
  const [apiServerUrl, setApiServerUrl] = React.useState(
    () => localStorage.getItem(API_SERVER_URL_STORAGE_KEY) || DEFAULT_API_SERVER_URL
  );
  React.useEffect(() => {
    localStorage.setItem(API_SERVER_URL_STORAGE_KEY, apiServerUrl);
  }, [apiServerUrl]);

  const { entries: nodeCatalog, loading: catalogLoading, error: catalogError, refresh: refreshCatalog } =
    useNodeCatalog(apiCatalogEnabled, apiServerUrl);
  const [selectedNodeId, setSelectedNodeId] = React.useState<string | null>(null);
  const selectedNode = nodeCatalog.find((entry) => entry.id === selectedNodeId) || null;

  const applyNodeFromCatalog = React.useCallback((entry: NodeCatalogEntry) => {
    setSelectedNodeId(entry.id);
    setSchemaText(JSON.stringify(entry.nodeInfo.propertiesSchema, null, 2));
    setUischemaText(JSON.stringify(entry.nodeInfo.propertiesUISchema, null, 2));
    setDataText(JSON.stringify(entry.nodeInfo.properties, null, 2));
    setSchema(entry.nodeInfo.propertiesSchema as JsonSchema);
    setUischema(entry.nodeInfo.propertiesUISchema as UISchemaElement);
    setData(entry.nodeInfo.properties);
    setSchemaError(null);
    setUischemaError(null);
    setDataError(null);
    setErrorCount(0);
  }, []);

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
            <Autocomplete
              size="small"
              sx={{ minWidth: 280 }}
              options={EXAMPLES}
              getOptionLabel={(option) => option.name}
              value={EXAMPLES[exampleIndex]}
              isOptionEqualToValue={(option, value) => option.name === value.name}
              onChange={(_event, value) => {
                if (value) applyExample(EXAMPLES.indexOf(value));
              }}
              renderInput={(params) => <TextField {...params} label="Example" />}
            />
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={apiCatalogEnabled}
                  onChange={(e) => setApiCatalogEnabled(e.target.checked)}
                />
              }
              label="Load from API"
              sx={{ flexShrink: 0, whiteSpace: 'nowrap' }}
            />
            <TextField
              size="small"
              label="API Server URL"
              value={apiServerUrl}
              onChange={(e) => setApiServerUrl(e.target.value)}
              sx={{ minWidth: 220, flexShrink: 0 }}
            />
            <Autocomplete
              size="small"
              sx={{ minWidth: 320 }}
              options={nodeCatalog}
              groupBy={(option) => option.categoryPath}
              getOptionLabel={(option) => option.name}
              value={selectedNode}
              loading={catalogLoading}
              disabled={catalogLoading && nodeCatalog.length === 0}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(_event, value) => {
                if (value) applyNodeFromCatalog(value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Load Node from API Server"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {catalogLoading ? <CircularProgress color="inherit" size={16} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
            <Tooltip title="Refresh node catalog from API server">
              <IconButton size="small" onClick={refreshCatalog} disabled={catalogLoading}>
                <RefreshIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            {catalogError && (
              <Chip
                size="small"
                color="warning"
                variant="outlined"
                label="API server unreachable"
                onClick={refreshCatalog}
                deleteIcon={<RefreshIcon fontSize="small" />}
                onDelete={refreshCatalog}
                title={catalogError}
              />
            )}
            <Box sx={{ flex: 1 }} />
            <Tooltip title="Preview in a NodeDialog-style popup (real dialog chrome, default 600x600 size)">
              <IconButton size="small" onClick={() => setDialogPreviewOpen(true)}>
                <OpenInNewIcon fontSize="small" />
              </IconButton>
            </Tooltip>
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
      <NodeDialogPreviewModal
        open={dialogPreviewOpen}
        onClose={() => setDialogPreviewOpen(false)}
        schema={schema}
        uischema={uischema}
        data={data}
        onDataChange={handleFormDataChange}
      />
    </ThemeProvider>
  );
}
