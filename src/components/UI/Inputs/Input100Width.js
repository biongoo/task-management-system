import { styled } from '@mui/system';
import { TextField } from '@mui/material';

const StyledInput = styled(TextField)(({ theme }) => ({
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
      borderRadius: theme.shape.borderRadius * 2,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.secondary.main,
    },
  },
}));

const Input100Width = (props) => {
  return (
    <StyledInput variant="outlined" noValidate autoComplete="off" {...props} />
  );
};

export default Input100Width;
