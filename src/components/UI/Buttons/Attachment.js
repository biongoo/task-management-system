import React from 'react';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const Input = styled('input')({
  display: 'none',
});

const Attachment = ({ id, onChange }) => {
  const { t } = useTranslation();

  return (
    <Box>
      <label htmlFor={id}>
        <Input id={id} multiple type="file" onChange={onChange} />
        <Button
          variant="outlined"
          color="secondary"
          component="span"
          endIcon={<AttachFileIcon />}
          sx={{
            color: (theme) => theme.palette.primary.light,
            borderColor: (theme) => theme.palette.primary.light,
            borderRadius: 2,
          }}
        >
          {t('layout.attach')}
        </Button>
      </label>
    </Box>
  );
};

export default Attachment;
