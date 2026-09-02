import { Box, Chip, Paper, Stack, Typography } from '@mui/material';
import { JsonForms } from '@jsonforms/react';
import { materialCells } from '@jsonforms/material-renderers';
import { JsonFormsCore, JsonSchema, UISchemaElement } from '@jsonforms/core';
import { customRenderers } from '../renderers';
import { nodeDialogFormSx } from '../nodeDialogFormSx';

interface FormPreviewPanelProps {
  schema: JsonSchema | undefined;
  uischema: UISchemaElement | undefined;
  data: any;
  onDataChange: (args: Pick<JsonFormsCore, 'data' | 'errors'>) => void;
  errorCount: number;
}

export function FormPreviewPanel({ schema, uischema, data, onDataChange, errorCount }: FormPreviewPanelProps) {
  return (
    <Paper variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 1.5, py: 0.75, borderBottom: 1, borderColor: 'divider', flexShrink: 0 }}
      >
        <Typography variant="caption" sx={{ fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>
          Rendered Form (NodeDialog renderers)
        </Typography>
        <Chip
          size="small"
          label={errorCount === 0 ? 'Valid' : `${errorCount} validation error${errorCount === 1 ? '' : 's'}`}
          color={errorCount === 0 ? 'success' : 'error'}
        />
      </Stack>
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflowX: 'auto',
          overflowY: 'auto',
          p: 2,
          // Ported verbatim from NodeDialog.tsx: works around @jsonforms/material-renderers@3.7.0
          // being built against @mui/material@^7's Grid API while this app pins @mui/material@^5.
          ...nodeDialogFormSx,
        }}
      >
        <JsonForms
          schema={schema}
          uischema={uischema}
          data={data}
          renderers={customRenderers}
          cells={materialCells}
          onChange={onDataChange}
        />
      </Box>
    </Paper>
  );
}
