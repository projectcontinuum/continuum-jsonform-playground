import { createTheme, ThemeOptions } from '@mui/material';

const shared: ThemeOptions = {
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
};

export const darkTheme = createTheme({
  ...shared,
  palette: {
    mode: 'dark',
    background: { default: '#1e1e1e', paper: '#252526' },
  },
});

export const lightTheme = createTheme({
  ...shared,
  palette: {
    mode: 'light',
  },
});
