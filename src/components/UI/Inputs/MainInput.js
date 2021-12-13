import { styled, alpha } from '@mui/system';
import { TextField } from '@mui/material';

const StyledInput = styled(TextField)(({ theme }) => ({
  '& label.Mui-focused': {
    color: theme.palette.secondary.main,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: theme.palette.secondary.main,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: alpha(theme.palette.primary.light, 0.4),
      borderRadius: theme.shape.borderRadius * 2,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.secondary.main,
    },
  },
}));

const MainInput = (props) => {
  return (
    <StyledInput variant="outlined" noValidate autoComplete="off" {...props} />
  );
};

export default MainInput;
