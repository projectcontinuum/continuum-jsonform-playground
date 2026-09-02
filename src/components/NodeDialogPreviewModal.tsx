import * as React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MaximizeIcon from '@mui/icons-material/Fullscreen';
import RestoreIcon from '@mui/icons-material/FullscreenExit';
import { JsonForms } from '@jsonforms/react';
import { materialCells } from '@jsonforms/material-renderers';
import { JsonFormsCore, JsonSchema, UISchemaElement } from '@jsonforms/core';
import { customRenderers } from '../renderers';
import { nodeDialogFormSx } from '../nodeDialogFormSx';

interface StyledDialogProps {
  customWidth?: number;
  customHeight?: number;
}

// Ported from NodeDialog.tsx's StyledDialog: scoped to `.MuiDialog-paper` (not the generic
// `.MuiPaper-root`), since the latter also matches nested Paper-based components (e.g. an
// array-with-detail control's Accordion items) and would force them to the dialog's own size.
const StyledDialog = styled(Dialog, {
  shouldForwardProp: (prop) => prop !== 'customWidth' && prop !== 'customHeight',
})<StyledDialogProps>(({ theme, customWidth, customHeight }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: theme.palette.background.paper || theme.palette.background.default || '#1e1e1e',
    backgroundImage: 'none',
    opacity: 1,
    width: customWidth ? `${customWidth}px` : 'auto',
    height: customHeight ? `${customHeight}px` : 'auto',
    maxWidth: 'none',
    maxHeight: 'none',
    position: 'relative',
    overflow: 'hidden',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper || theme.palette.background.default || '#1e1e1e',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper || theme.palette.background.default || '#1e1e1e',
  },
  '& .MuiDialogTitle-root': {
    backgroundColor: theme.palette.background.paper || theme.palette.background.default || '#1e1e1e',
  },
}));

const ResizeHandle = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  right: 0,
  width: '20px',
  height: '20px',
  cursor: 'nwse-resize',
  zIndex: 9999,
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '2px',
    right: '2px',
    width: '0',
    height: '0',
    borderStyle: 'solid',
    borderWidth: '0 0 12px 12px',
    borderColor: `transparent transparent ${theme.palette.grey[500]} transparent`,
  },
}));

const MIN_DIALOG_WIDTH = 400;
const MIN_DIALOG_HEIGHT = 300;
const DEFAULT_DIALOG_SIZE = { width: 600, height: 600 };

interface NodeDialogPreviewModalProps {
  open: boolean;
  onClose: () => void;
  schema: JsonSchema | undefined;
  uischema: UISchemaElement | undefined;
  data: any;
  onDataChange: (args: Pick<JsonFormsCore, 'data' | 'errors'>) => void;
}

// Mirrors continuum-workbench's NodeDialog.tsx chrome (title bar, maximize/close icons,
// drag-resize handle, default 600x600 size) so this playground can preview a schema/uischema
// under the real dialog's fixed default size instead of only the roomy, user-resizable
// FormPreviewPanel - that fixed width is what surfaces crowding bugs the panel hides. There's
// no "Retry Policy" tab here since that's node-execution config unrelated to an arbitrary
// schema, and no Save/Cancel distinction since edits made here already flow straight into
// this app's single `data` state via onDataChange, same as FormPreviewPanel.
export function NodeDialogPreviewModal({ open, onClose, schema, uischema, data, onDataChange }: NodeDialogPreviewModalProps) {
  const [dialogSize, setDialogSize] = React.useState(DEFAULT_DIALOG_SIZE);
  const [isResizing, setIsResizing] = React.useState(false);
  const [isMaximized, setIsMaximized] = React.useState(false);
  const resizeStartPos = React.useRef({ x: 0, y: 0, width: 0, height: 0 });
  const previousSize = React.useRef(DEFAULT_DIALOG_SIZE);

  // Reset to the default size each time the dialog is reopened, rather than persisting
  // whatever size it was left at - keeps "preview at the real dialog's default size" true.
  React.useEffect(() => {
    if (open) {
      setDialogSize(DEFAULT_DIALOG_SIZE);
      setIsMaximized(false);
    }
  }, [open]);

  const handleMaximize = React.useCallback(() => {
    if (isMaximized) {
      setDialogSize(previousSize.current);
      setIsMaximized(false);
    } else {
      previousSize.current = dialogSize;
      setDialogSize({ width: window.innerWidth, height: window.innerHeight });
      setIsMaximized(true);
    }
  }, [isMaximized, dialogSize]);

  const handleResizeStart = React.useCallback((e: React.MouseEvent) => {
    if (isMaximized) return;
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    resizeStartPos.current = { x: e.clientX, y: e.clientY, width: dialogSize.width, height: dialogSize.height };
  }, [dialogSize, isMaximized]);

  React.useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - resizeStartPos.current.x;
      const deltaY = e.clientY - resizeStartPos.current.y;
      const newWidth = Math.max(MIN_DIALOG_WIDTH, Math.min(window.innerWidth, resizeStartPos.current.width + deltaX));
      const newHeight = Math.max(MIN_DIALOG_HEIGHT, Math.min(window.innerHeight, resizeStartPos.current.height + deltaY));
      setDialogSize({ width: newWidth, height: newHeight });
    };
    const handleMouseUp = () => setIsResizing(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  return (
    <StyledDialog open={open} onClose={onClose} customWidth={dialogSize.width} customHeight={dialogSize.height}>
      <DialogTitle>Node Settings</DialogTitle>
      <IconButton
        aria-label="maximize"
        onClick={handleMaximize}
        sx={{ position: 'absolute', right: 48, top: 8, color: (theme) => theme.palette.grey[500] }}
      >
        {isMaximized ? <RestoreIcon /> : <MaximizeIcon />}
      </IconButton>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}>
        {/*
          NodeDialog.tsx's own TabPanel div is the one element in that component actually
          declared as the scroll owner (flex: 1, minHeight: 0, overflowY/X: 'auto'). Its single
          child there never itself sets overflow, which matters: a flex item whose overflow is
          the default 'visible' keeps its content-based automatic minimum height, so excess
          height becomes genuine overflow the scroll owner can show a scrollbar for. Give that
          same role to a *second* flex item with overflow set (as this file used to, mirroring
          NodeDialog's own further-nested Box) and its automatic minimum height collapses to 0
          instead - the flexbox algorithm then happily shrinks it below its content size to fit
          whatever room is left, silently clipping everything under the fold rather than ever
          reporting overflow. This modal skips NodeDialog's Properties/Retry Policy tabs (not
          applicable to an arbitrary schema), so - like FormPreviewPanel - it wraps <JsonForms>
          in a single box that both scrolls and holds the content, instead of NodeDialog's
          TabPanel-plus-two-Boxes chain.
        */}
        <Box
          sx={{
            width: '100%',
            minWidth: 0,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            minHeight: 0,
            overflowY: 'auto',
            overflowX: 'auto',
            p: 2,
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
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Close
        </Button>
      </DialogActions>
      {!isMaximized && <ResizeHandle onMouseDown={handleResizeStart} />}
    </StyledDialog>
  );
}
