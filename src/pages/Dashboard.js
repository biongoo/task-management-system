import React from 'react';
import { Box } from '@mui/material';
import CalendarPicker from '@mui/lab/CalendarPicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

const Dashboard = () => {
  const [date, setDate] = React.useState(new Date());

  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)} />
      </LocalizationProvider>
    </Box>
  );
};

export default Dashboard;
