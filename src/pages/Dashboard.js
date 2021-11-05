import React from 'react';
import { Grid, Paper, Container } from '@mui/material';

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
            <Paper> {note.title} </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
