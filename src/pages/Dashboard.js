import React from 'react';
import { Grid, Paper, Container } from '@mui/material';

import LinkButton100Width from '../components/UI/Buttons/LinkButton100Width';

const DUMMY_DATA = [
  {
    id: 1,
    title:
      'Pierwszy wwwwwwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwww wwwwwwwwwwwwww',
    description: 'Pierwszy opis',
  },
  { id: 2, title: 'Drugi', description: 'Drugi opis' },
  { id: 3, title: 'Trzeci', description: 'Trzeci opis' },
];

const Dashboard = () => {
  return (
    <Container>
      <Grid container spacing={3}>
        {DUMMY_DATA.map((note) => (
          <Grid key={note.id} item xs={12} sm={6} md={4}>
            <Paper> {note.title} <LinkButton100Width to="/" /> </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
