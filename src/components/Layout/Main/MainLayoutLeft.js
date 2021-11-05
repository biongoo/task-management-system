import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Drawer,
  Toolbar,
  Divider,
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';

const MainLayoutLeft = ({ drawerWidth, mobileOpen, drawerToggleHandler }) => {
  const { t } = useTranslation();

  /* const menuItems = [
    {
      text: 'My Notes',
      icon: <InboxIcon />,
      path: '/',
    },
  ]; */

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
          Nested List Items
        </ListSubheader>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <ListSubheader
        component="div"
        sx={{
          bgcolor: 'primary.dark',
          fontSize: 18,
          color: 'text.secondary',
        }}
      >
        Nested List Items
      </ListSubheader>
      <List>
        {[
          'All mail',
          'Trash',
          'Spam',
          'All mail2',
          'Trash2',
          'Spam2',
          'All mail3',
          'Trash3',
          'Spam3',
        ].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
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
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={drawerToggleHandler}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>

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
