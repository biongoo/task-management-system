import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#212b36',
      dark: '#161c24',
      light: '#919eab',
    },
    secondary: {
      main: '#fda92d',
    },
    background: {
      paper: '#212b36',
      default: '#161c24',
    },
    text: {
      primary: '#fff',
      secondary: 'rgb(145, 158, 171)',
    },
    action: {
      selected: 'rgba(145, 158, 171, 0.24)',
      hover: 'rgba(145, 158, 171, 0.08)',
    },
  },
});

const Theme = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
