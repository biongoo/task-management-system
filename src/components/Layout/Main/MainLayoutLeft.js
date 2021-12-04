import React from 'react';
import { useSelector } from 'react-redux';
import { alpha } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import {
  Box,
  SwipeableDrawer,
  Toolbar,
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

const MainLayoutLeft = ({ drawerWidth, mobileOpen, drawerToggleHandler }) => {
  const { t } = useTranslation();
  const typeOfAccount = useSelector((state) => state.auth.type);

  const menuItems = [];

  //student
  if (+typeOfAccount === 1) {
    menuItems.push(
      {
        text: t('global.teachers'),
        icon: <SchoolIcon sx={{ color: 'primary.light' }} />,
        path: '/dashboard/teachers',
      },
      {
        text: 'Test1',
        icon: <SchoolIcon sx={{ color: 'primary.light' }} />,
        path: '/dashboard/test1',
      },
      {
        text: 'Test2',
        icon: <SchoolIcon sx={{ color: 'primary.light' }} />,
        path: '/dashboard/test2',
      }
    );
  }

  //teacher
  if (+typeOfAccount === 2) {
    menuItems.push({
      text: 'My Notes',
      icon: <SchoolIcon />,
      path: '/test2',
    });
  }

  const drawer = (
    <>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Typography variant="h6" component="div">
          {t('layout.shortTitle')}
        </Typography>
      </Toolbar>
      <List>
        <ListSubheader
          component="div"
          sx={{
            bgcolor: 'primary.dark',
            fontSize: 18,
            color: 'text.secondary',
          }}
        >
          General
        </ListSubheader>
        {menuItems.map((item) => (
          <ListItem
            component={NavLink}
            to={item.path}
            button
            key={item.text}
            sx={{
              '&.active': {
                bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.15),
                color: 'secondary.main',
                '& .MuiSvgIcon-root': {
                  color: 'secondary.main',
                },
              },
              '&:hover': {
                bgcolor: (theme) => alpha(theme.palette.primary.light, 0.1),
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      <SwipeableDrawer
        variant="temporary"
        open={mobileOpen}
        onClose={drawerToggleHandler}
        onOpen={drawerToggleHandler}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            '& .MuiListSubheader-root': {
              bgcolor: 'primary.main',
            },
          },
        }}
      >
        {drawer}
      </SwipeableDrawer>

      <SwipeableDrawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            bgcolor: 'primary.dark',
            borderRight: '1px solid',
            borderColor: (theme) => alpha(theme.palette.primary.light, 0.24),
          },
        }}
        open
      >
        {drawer}
      </SwipeableDrawer>
    </Box>
  );
};

export default MainLayoutLeft;
