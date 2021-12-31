import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import {
  List,
  Link,
  Stack,
  Avatar,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
} from '@mui/material';

import Dialog from '../UI/Modals/Dialog';

const Attachments = ({ attachments, handleClose }) => {
  const { t } = useTranslation();
  const [descAtach, setdescAtach] = useState({ files: [], description: '' });

  useEffect(() => {
    if (attachments && Object.keys(attachments).length > 0) {
      setdescAtach(attachments);
    }
  }, [attachments, setdescAtach]);

  const open = attachments.open;

  const body = (
    <Stack spacing={2}>
      {descAtach.description && (
        <Typography>
          {t('materials.description')}: {descAtach.description}
        </Typography>
      )}
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
                  href={`http://java.ts4ever.pl/materials/files/download/${item.id}`}
                  color="inherit"
                >
                  {item.name}
                </Link>
              }
            />
          </ListItem>
        ))}
      </List>
      {}
    </Stack>
  );

  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      title={t('materials.attachments')}
      body={body}
    />
  );
};

export default Attachments;
