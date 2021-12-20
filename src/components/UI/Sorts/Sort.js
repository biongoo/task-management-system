import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Menu, MenuItem, Box, Typography } from '@mui/material';

import IconButton from '../Buttons/IconButton';

const Sort = ({ selectedIndex, setSelectedIndex }) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const options = [
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignContent: 'center' }}>
      <ArrowDropUpIcon />
      <Typography sx={{ pl: 1 }}>{t('global.alphabetically')}</Typography>
    </Box>,
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignContent: 'center' }}>
      <ArrowDropDownIcon />
      <Typography sx={{ pl: 1 }}>{t('global.alphabetically')}</Typography>
    </Box>,
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignContent: 'center' }}>
      <ArrowDropUpIcon />
      <Typography sx={{ pl: 1 }}>{t('global.dateAdded')}</Typography>
    </Box>,
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignContent: 'center' }}>
      <ArrowDropDownIcon />
      <Typography sx={{ pl: 1 }}>{t('global.dateAdded')}</Typography>
    </Box>,
  ];

  return (
    <>
      <IconButton
        tooltip={t('global.sort')}
        onClick={handleOpen}
        open={open}
        Icon={FilterListIcon}
      />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 75,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        sx={{
          '& .MuiMenu-paper': {
            bgcolor: 'primary.main',
          },
          '& .MuiMenu-list .MuiMenuItem-root.Mui-selected': {
            bgcolor: 'action.selected',
          },
          '& .MuiMenu-list .MuiMenuItem-root:hover': {
            backgroundColor: 'action.hover',
          },
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={index}
            selected={index === selectedIndex}
            onClick={() => handleMenuItemClick(index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Sort;
