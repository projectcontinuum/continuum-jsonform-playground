import { Box, Chip, Paper, Stack, Typography } from '@mui/material';
import { JsonForms } from '@jsonforms/react';
import { materialCells } from '@jsonforms/material-renderers';
import { JsonFormsCore, JsonSchema, UISchemaElement } from '@jsonforms/core';
import { customRenderers } from '../renderers';

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
          '& .MuiGrid-container[class*="MuiGrid-direction-xs-column"]': {
            flexWrap: 'nowrap',
          },
          // MaterialLayoutRenderer (util/layout.tsx) hardcodes
          // `spacing={direction === 'row' ? 2 : 0}` - VerticalLayout/Group columns get literally
          // zero gap between their stacked children, and MaterialInputControl's own FormControl
          // has no margin either. Every outlined field's shrunk label sits ~9px above its own
          // input border, so with zero gap it renders flush against (visually overlapping) the
          // bottom border of the field stacked above it. Restore a real gap between stacked
          // column children (top-level fields, and array-item `detail` fields alike).
          '& .MuiGrid-container[class*="MuiGrid-direction-xs-column"] > .MuiGrid-root + .MuiGrid-root': {
            mt: 2,
          },
          '& .MuiCardContent-root > .MuiGrid-container': {
            flexDirection: 'column',
            flexWrap: 'nowrap',
          },
          '& .MuiToolbar-root .MuiGrid-container[class*="MuiGrid-spacing-xs-"], & .MuiTableCell-root .MuiGrid-container[class*="MuiGrid-spacing-xs-"]': {
            marginLeft: 0,
            width: '100%',
            columnGap: 2,
          },
          // ExpandPanelRenderer (the per-item accordion header rendered by
          // @jsonforms/material-renderers' array-with-detail control, e.g.
          // workflowCredentials/workflowVariables) lays out its
          // AccordionSummary as two Grid "columns" (item label+index vs.
          // move-up/move-down/delete icons) using the v7-only Grid2 `size`
          // prop. `size` isn't a prop @mui/material@^5's classic Grid
          // understands, so neither column gets its intended ~70/30 or
          // ~90/10 width split -- both fall back to content-based flex
          // sizing and can crowd or overlap, especially once
          // `showSortButtons: true` adds a third icon button competing for
          // space with the item's label. Force the header row to stay
          // side-by-side without wrapping, let the now-unsized "item" Grids
          // (they carry .MuiGrid-root but never .MuiGrid-item, since `item`
          // is likewise never passed) shrink instead of overflowing, and
          // ellipsize the label span itself so a long computed label loses
          // characters gracefully rather than colliding with the icons.
          '& .MuiAccordionSummary-root .MuiGrid-container': {
            flexWrap: 'nowrap',
          },
          '& .MuiAccordionSummary-root .MuiGrid-root:not(.MuiGrid-container)': {
            minWidth: 0,
            flex: '0 1 auto',
          },
          '& .MuiAccordionSummary-root span[id^="expand-panel"]': {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          },
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
