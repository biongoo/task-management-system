import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import SubjectIcon from '@mui/icons-material/Subject';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AttachmentIcon from '@mui/icons-material/Attachment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import {
  Box,
  Drawer,
  SwipeableDrawer,
  Toolbar,
  List,
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
        text: t('layout.home'),
        icon: <HomeIcon sx={{ color: 'primary.light' }} />,
        path: '/dashboard/',
      },
      {
        text: t('global.teachers'),
        icon: <PeopleAltIcon sx={{ color: 'primary.light' }} />,
        path: '/dashboard/teachers',
      },
      {
        text: t('layout.subjects'),
        icon: <SubjectIcon sx={{ color: 'primary.light' }} />,
        path: '/dashboard/subjects',
      },
      {
        text: t('layout.homework'),
        icon: <HomeWorkIcon sx={{ color: 'primary.light' }} />,
        path: '/dashboard/homework',
      },
      {
        text: t('layout.materials'),
        icon: <AttachmentIcon sx={{ color: 'primary.light' }} />,
        path: '/dashboard/materials',
      },
      {
        text: t('layout.marks'),
        icon: <SchoolIcon sx={{ color: 'primary.light' }} />,
        path: '/dashboard/marks',
      },
      {
        text: t('layout.plan'),
        icon: <ScheduleIcon sx={{ color: 'primary.light' }} />,
        path: '/dashboard/plan',
      }
    );
  }

  //teacher
  if (+typeOfAccount === 2) {
    menuItems.push(
      {
        text: t('layout.home'),
        icon: <HomeIcon sx={{ color: 'primary.light' }} />,
        path: '/dashboard/',
      },
      {
        text: t('layout.universities'),
        icon: <AccountBalanceIcon sx={{ color: 'primary.light' }} />,
        path: '/dashboard/universities',
      },
      {
        text: t('layout.fields'),
        icon: <SubjectIcon sx={{ color: 'primary.light' }} />,
        path: '/dashboard/fields',
      },
      {
        text: t('layout.subjects'),
        icon: <SchoolIcon sx={{ color: 'primary.light' }} />,
        path: '/dashboard/subjects',
      },
      {
        text: t('layout.plan'),
        icon: <ScheduleIcon sx={{ color: 'primary.light' }} />,
        path: '/dashboard/plan',
      }
    );
  }

  const drawer = (
    <>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Typography variant="h6" component="div">
          {t('layout.shortTitle')}
        </Typography>
      </Toolbar>
      <List>
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
                borderRight: '4px solid',
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

      <Drawer
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
      </Drawer>
    </Box>
  );
};

export default MainLayoutLeft;
