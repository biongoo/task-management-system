import { styled } from '@mui/system';
import { TextField } from '@mui/material';

const AuthInput = styled(TextField)(({ theme }) => ({
  marginTop: 16,
  width: '100%',
  '& label.Mui-focused': {
    color: theme.palette.secondary.main,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: theme.palette.secondary.main,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.primary.light,
      borderRadius: theme.shape.borderRadius * 3,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.secondary.main,
    },
  },
}));

export default AuthInput;
