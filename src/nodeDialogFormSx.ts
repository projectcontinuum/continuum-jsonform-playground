// Ported verbatim from continuum-workbench's NodeDialog.tsx (the Box wrapping <JsonForms>
// inside its "Properties" tab). Works around @jsonforms/material-renderers@3.7.0 being built
// against @mui/material@^7's Grid API while this app (and the real workbench) pins
// @mui/material@^5. Shared by FormPreviewPanel and NodeDialogPreviewModal so both stay in
// lockstep with the real dialog's rendering fixes instead of drifting apart.
export const nodeDialogFormSx = {
  '& .MuiGrid-container[class*="MuiGrid-direction-xs-column"]': {
    flexWrap: 'nowrap',
  },
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
} as const;

// The real NodeDialog's Properties-tab Box additionally sets pt: 1.5 to keep the first
// field's floating label from clipping against the box's own top edge once overflowX: 'auto'
// implicitly promotes overflowY to 'auto' too (see NodeDialog.tsx's comment on this exact
// rule). FormPreviewPanel doesn't need it (its own p: 2 already clears the label), but the
// modal below replicates NodeDialog's box structure exactly, so it needs the same pt.
export const nodeDialogFormSxWithTopPadding = {
  ...nodeDialogFormSx,
  pt: 1.5,
} as const;
