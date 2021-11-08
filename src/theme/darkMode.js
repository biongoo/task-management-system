import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#212b36',
      dark: '#161c24',
      light: '#919eab',
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
    palettebg: {
      light: '#fff',
      dark: '#212b36',
    },
  },
});

export default darkTheme;
