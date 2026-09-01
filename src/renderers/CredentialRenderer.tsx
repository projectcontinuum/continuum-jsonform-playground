import React from 'react';
import { ControlProps, isControl, rankWith } from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import {
  Box,
  FormHelperText,
  Typography,
  TextField,
  Button,
  Autocomplete,
  CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import { getMockCredentials, MockCredential } from '../mock/mockCredentials';

interface CredentialRendererProps extends ControlProps {
  options?: {
    format?: string;
    credentialType?: string;
  };
}

// Ported from continuum-workbench/workflow-editor-extension/.../CredentialRenderer.tsx.
// There's no real credentials-server here, so this always uses the mock credential list
// (the real component's USE_MOCK_DATA=false / credentialsService path).
const CredentialRenderer: React.FC<CredentialRendererProps> = (props) => {
  const { data, handleChange, label, errors, visible, path, uischema } = props;

  const options = (uischema as any)?.options || {};
  const credentialType = options.credentialType || '';
  const format = options.format || '';

  const [credentials, setCredentials] = React.useState<MockCredential[]>([]);
  const [loading, setLoading] = React.useState(false);

  const fetchCredentials = React.useCallback(async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setCredentials(getMockCredentials(credentialType));
    } finally {
      setLoading(false);
    }
  }, [credentialType]);

  React.useEffect(() => {
    if (visible && format === 'credential') {
      fetchCredentials();
    }
  }, [fetchCredentials, visible, format]);

  const handleAutocompleteChange = (_event: React.SyntheticEvent, value: MockCredential | null) => {
    handleChange(path, value?.name || '');
  };

  const handleAddNew = () => {
    // eslint-disable-next-line no-console
    console.log('[CredentialRenderer] "New" would open the credentials-manager UI in the real app.');
  };

  if (format !== 'credential') {
    return null;
  }

  if (!visible) {
    return null;
  }

  const hasError = Boolean(errors && errors.length > 0);
  const errorMessage = hasError ? errors : undefined;

  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      {label && (
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
          {label}
        </Typography>
      )}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Autocomplete
          fullWidth
          size="small"
          options={credentials}
          getOptionLabel={(option) => option.name}
          value={credentials.find((c) => c.name === data) || null}
          onChange={handleAutocompleteChange}
          loading={loading}
          disabled={loading}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          renderOption={(liProps, option) => (
            <li {...liProps} key={option.name}>
              <Box>
                <Typography variant="body2">{option.name}</Typography>
                {option.description && (
                  <Typography variant="caption" color="text.secondary">
                    {option.description}
                  </Typography>
                )}
              </Box>
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Credential"
              error={hasError}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          slotProps={{
            popper: {
              sx: { zIndex: 9999 },
            },
          }}
        />
        <Button
          variant="outlined"
          size="small"
          onClick={fetchCredentials}
          disabled={loading}
          sx={{ minWidth: 'auto', p: '4px' }}
          title="Refresh credentials"
        >
          <RefreshIcon fontSize="small" />
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<AddIcon />}
          onClick={handleAddNew}
          sx={{ whiteSpace: 'nowrap', minWidth: 'auto' }}
        >
          New
        </Button>
      </Box>
      {errorMessage && (
        <FormHelperText error={true} sx={{ mt: 1 }}>
          {errorMessage}
        </FormHelperText>
      )}
    </Box>
  );
};

export const CredentialControl = withJsonFormsControlProps(CredentialRenderer);

export const credentialTester = rankWith(
  10,
  (uischema: any) => isControl(uischema) && uischema.options?.format === 'credential'
);

export default CredentialControl;
