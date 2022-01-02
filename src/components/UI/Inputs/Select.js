import React from 'react';
import { styled } from '@mui/system';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';

const StyledSelect = styled(FormControl)(({ theme }) => ({
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
    '& svg': {
      color: theme.palette.primary.light,
    },
    '&.Mui-focused': {
      '& fieldset': {
        borderColor: theme.palette.secondary.main,
      },
      '& svg': {
        color: theme.palette.secondary.main,
      },
    },
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    sx: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      bgcolor: (theme) => theme.palette.primary.dark,
    },
  },
};

const Notifications = ({ id, label, list, value, onChange }) => {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    onChange(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <StyledSelect fullWidth>
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        labelId={id}
        multiple
        value={value}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) =>
          selected.map((index) => list[index]).join(', ')
        }
        MenuProps={MenuProps}
      >
        {list.map((item, index) => (
          <MenuItem key={index} value={index}>
            <Checkbox checked={value.indexOf(index) > -1} color="secondary" />
            <ListItemText primary={item} />
          </MenuItem>
        ))}
      </Select>
    </StyledSelect>
  );
};

export default Notifications;
