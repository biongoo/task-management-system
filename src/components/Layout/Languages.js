import React, { useState } from 'react';
import { alpha } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { Menu, MenuItem, Typography, IconButton, Box } from '@mui/material';

const Languages = () => {
  const { i18n } = useTranslation();
  const languages = i18n.store.data;
  const actualLanguageId = i18n.language;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (value) => {
    i18n.changeLanguage(value);
    localStorage.setItem('lang', value);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [];

  for (const lang in languages) {
    menuItems.push(
      <MenuItem
        sx={{
          height: '40px',
        }}
        key={languages[lang].id}
        selected={languages[lang].id === actualLanguageId}
        onClick={handleMenuItemClick.bind(null, languages[lang].id)}
      >
        <Box
          component="img"
          src={languages[lang].url}
          alt={languages[lang].name}
          sx={{
            width: 27,
            height: 20,
            borderRadius: 2,
            boxShadow: 4,
          }}
        />
        <Typography ml={1} variant="body2">
          {languages[lang].name}
        </Typography>
      </MenuItem>
    );
  }

  return (
    <>
      <IconButton
        color="secondary"
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.secondary.main,
                theme.palette.action.focusOpacity
              ),
          }),
        }}
        onClick={handleClick}
      >
        <Box
          component="img"
          src={languages[actualLanguageId].url}
          alt={languages[actualLanguageId].name}
          sx={{
            width: 27,
            height: 20,
            borderRadius: 2,
            boxShadow: 4,
          }}
        />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transitionDuration={300}
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
              right: 50,
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
        {menuItems}
      </Menu>
    </>
  );
};

export default Languages;
