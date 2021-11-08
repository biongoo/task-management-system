import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#fff',
      dark: '#fff',
      light: 'rgb(99, 115, 129)',
    },
    background: {
      paper: '#fff',
      default: '#fff',
    },
    text: {
      primary: 'rgb(33, 43, 54)',
      secondary: 'rgb(33, 43, 54)',
    },
    action: {
      selected: 'rgba(145, 158, 171, 0.24)',
      hover: 'rgba(145, 158, 171, 0.08)',
    },
    palettebg: {
      light: '#fff',
      dark: '#212b36',
    },
  },
});

export default lightTheme;
