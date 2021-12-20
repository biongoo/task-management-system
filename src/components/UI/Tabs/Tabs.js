import React, { useState } from 'react';
import { alpha } from '@mui/system';
import { Box, Tabs as MuiTabs, Tab, Stack } from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

const Tabs = ({ items, name }) => {
  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        sx={{
          width: '100%',
          bgcolor: 'primary.main',
          mt: { xs: 2, sm: 0 },
          visibility: { xs: 'visible', sm: 'hidden' },
          height: { sm: 0 },
        }}
      >
        <Box
          sx={{
            borderBottom: 1,
            borderColor: (theme) => alpha(theme.palette.primary.light, 0.4),
          }}
        >
          <MuiTabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            sx={{
              '& .MuiTabs-scrollButtons.Mui-disabled': {
                opacity: 0.3,
              },
            }}
          >
            {items.map((_, index) => (
              <Tab
                label={`${name} ${index + 1}`}
                key={index}
                {...a11yProps(index)}
              />
            ))}
          </MuiTabs>
        </Box>
        {items.map((item, index) => (
          <TabPanel value={value} index={index} key={index}>
            <Stack spacing={2}>{item}</Stack>
          </TabPanel>
        ))}
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: 'primary.main',
          display: 'flex',
          visibility: { xs: 'hidden', sm: 'visible' },
          height: { xs: 0, sm: 242 },
          mt: { xs: 0, sm: 2 },
          border: '1px solid',
          borderColor: 'primary.light',
          borderRadius: 2,
        }}
      >
        <MuiTabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            borderRight: 1,
            borderColor: (theme) => alpha(theme.palette.primary.light, 0.4),
          }}
          textColor="secondary"
          indicatorColor="secondary"
        >
          {items.map((_, index) => (
            <Tab
              label={`${name} ${index + 1}`}
              key={index}
              {...a11yProps(index)}
            />
          ))}
        </MuiTabs>
        {items.map((item, index) => (
          <TabPanel
            style={{ flexGrow: 1 }}
            value={value}
            index={index}
            key={index}
          >
            <Stack spacing={2}>{item}</Stack>
          </TabPanel>
        ))}
      </Box>
    </>
  );
};

export default Tabs;
