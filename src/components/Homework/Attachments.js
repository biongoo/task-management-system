import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import {
  Box,
  List,
  Link,
  Stack,
  Avatar,
  ListItem,
  Typography,
  ListItemText,
  ListItemAvatar,
} from '@mui/material';

import Dialog from '../UI/Modals/Dialog';

const Attachments = ({ attachments, handleClose, buildDateTime }) => {
  const { t, i18n } = useTranslation();
  const [descAtach, setdescAtach] = useState({
    files: [],
    description: '',
    dateList: { times: [] },
  });

  useEffect(() => {
    if (
      attachments &&
      Object.keys(attachments).length > 0 &&
      attachments.open
    ) {
      setdescAtach(attachments);
    }
  }, [attachments, setdescAtach]);

  const open = attachments.open;
  const lang = i18n.language;

  const body = (
    <Stack spacing={2}>
      <Typography>
        {`${t('global.description')}: `}
        {descAtach.description
          ? descAtach.description
          : t('global.descriptionEmpty')}
      </Typography>
      {descAtach.files.length > 0 && (
        <List sx={{ py: 0 }}>
          {descAtach.files.map((item, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'primary.dark' }}>
                  <FilePresentIcon sx={{ color: 'primary.light' }} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Link
                    href={`https://ts4ever.pl:8443/files/download/${item.id}`}
                    color="inherit"
                  >
                    {item.name}
                  </Link>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
      {typeof descAtach.dateList !== 'undefined' && (
        <Box>
          <Typography>{`${t('homework.estimatedTimeLong')}: `}</Typography>
          <Typography>
            {descAtach.dateList.times.length === 0 &&
              t('homework.emptyEstimatedHours')}
          </Typography>
          {descAtach.dateList.times.length !== 0 && (
            <List sx={{ mt: 0 }}>
              {descAtach.dateList.times.map((item, index) => (
                <ListItem key={index} sx={{ py: '6px' }}>
                  <ListItemText
                    primary={
                      <>
                        {buildDateTime(item.start, lang)} -{' '}
                        {buildDateTime(item.end, lang)}
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      )}
    </Stack>
  );

  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      title={t('materials.info')}
      body={body}
    />
  );
};

export default Attachments;
