import React, { useState } from 'react';
import { alpha } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Box, Menu, Badge, IconButton, Typography } from '@mui/material';

import Divider from '../../UI/Dividers/Divider';
import getNotifications from '../../../store/user/getNotifications';
import viewNotifications from '../../../store/user/viewNotifications';
import {
  formatDistanceToNow,
  formatDistanceStrict,
} from '../../../utils/formatDate';

const Notifications = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const notifications = useSelector((state) => state.user.notifications);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    dispatch(getNotifications());
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    const id = [];

    for (const item of notifications) {
      if (!item.isViewed) id.push(item.id);
    }

    dispatch(viewNotifications({ id }));
  };

  let notificationsAmount = 0;

  for (const item of notifications) {
    if (!item.isViewed) notificationsAmount++;
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
        <Badge
          badgeContent={notificationsAmount}
          max={9}
          color="secondary"
          sx={{ '& .MuiBadge-badge': { color: 'primary.main' } }}
        >
          <NotificationsIcon
            sx={{
              width: 28,
              height: 28,
              color: open ? 'secondary.main' : 'primary.light',
            }}
          />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ '& .MuiPaper-root': { width: '280px' } }}
        PaperProps={{
          elevation: 0,
          sx: {
            maxHeight: '400px',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
          },
        }}
      >
        {!notifications.length && (
          <Typography align="center" my={1}>
            {t('layout.noNotifications')}
          </Typography>
        )}
        {notifications.map((item, idx) => (
          <Box key={item.id}>
            <Box
              sx={{
                px: 2,
                py: 1,
                ...(!item.isViewed && {
                  bgcolor: (theme) =>
                    alpha(
                      theme.palette.primary.light,
                      theme.palette.action.focusOpacity
                    ),
                }),
              }}
            >
              <Typography variant="body1">{item.name}</Typography>
              <Typography variant="body1">
                {new Date(item.deadline) - new Date(item.alertDate) === 0 &&
                  t('layout.now')}
                {new Date(item.deadline) - new Date(item.alertDate) !== 0 &&
                  formatDistanceStrict(
                    new Date(item.deadline),
                    new Date(item.alertDate),
                    i18n.language
                  )}
              </Typography>
              <Typography variant="body2" color="primary.light">
                {formatDistanceToNow(new Date(item.alertDate), i18n.language)}
              </Typography>
            </Box>
            <Box>{++idx !== notifications.length && <Divider />}</Box>
          </Box>
        ))}
      </Menu>
    </>
  );
};

export default Notifications;
