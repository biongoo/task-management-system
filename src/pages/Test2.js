import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
/* import { styled } from '@mui/styles'; */

/* const MyText = styled(TextField)({
  marginTop: 20,
  marginBottom: 20,
}); */

const Test2 = () => {
  const [details, setDetails] = useState('');

  console.log(details);

  return (
    <Container size="sm">
      <Typography
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Create a New Note
      </Typography>

      <Box component="form" noValidate autoComplete="off">
        <TextField
          label="Label"
          variant="outlined"
          fullWidth
          required
          onChange={(e) => setDetails(e.target.value)}
        />
        <TextField
          label="Details"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          required
        />
      </Box>

      <Button
        onClick={() => console.log('you clicked me')}
        type="submit"
        color="primary"
        variant="contained"
        endIcon={<KeyboardArrowRightIcon />}
      >
        Submit
      </Button>
    </Container>
  );
};

export default Test2;
