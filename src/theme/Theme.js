import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import darkTheme from './darkMode';
import lightTheme from './lightMode';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const Theme = ({ children }) => {
  const paletteMode = useSelector((state) => state.palette.mode);
  const paletteColor = useSelector((state) => state.palette.color);

  const theme = createTheme(paletteMode === 'light' ? lightTheme : darkTheme, {
    palette: { secondary: { main: paletteColor } },
    mixins: {
      toolbar: {
        minHeight: 64,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
