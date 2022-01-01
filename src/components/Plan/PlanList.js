import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import { TransitionGroup } from 'react-transition-group';
import { Paper, Grid, Typography, Stack, Box, Collapse } from '@mui/material';

import EditDay from './EditDay';
import Divider from '../UI/Dividers/Divider';
import IconButton from '../UI/Buttons/IconButton';

const PlanList = ({ planList }) => {
  const { t } = useTranslation();
  const [openDay, setOpenDay] = useState(false);

  const handleOpenDay = (day) => {
    setOpenDay(day);
  };

  const handleCloseDay = () => {
    setOpenDay(false);
  };

  let plan = [];

  for (let i = 0; i < 7; i++) {
    if (planList[i]) plan.push(planList[i]);
    else plan.push([]);
  }

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="stretch"
      >
        {plan.map((day, index) => (
          <Paper
            sx={{
              minWidth: 270,
              width: 290,
              m: 2,
              borderRadius: 2,
              boxShadow: 5,
            }}
            key={index}
          >
            <Box m={2}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
              >
                <Typography gutterBottom variant="h5" mb={0}>
                  {t(`plan.day${++index}`)}
                </Typography>
                <IconButton
                  tooltip={t('global.edit')}
                  open={openDay === day}
                  onClick={handleOpenDay.bind(null, { day, number: index })}
                  Icon={EditIcon}
                />
              </Stack>
              <Divider />
              {day.length === 0 && (
                <Typography mt={1.5} variant="body1">
                  {t('plan.freeDay')}
                </Typography>
              )}
              <Stack
                component={TransitionGroup}
                spacing={1}
                mt={day.length ? 1.5 : 0}
              >
                {day.map((item, idx) => {
                  let time = '';
                  time += item.startTime.slice(0, 5);
                  time += ' - ';
                  time += item.endTime.slice(0, 5);

                  let repetition = '';
                  if (item.repetition !== 0) {
                    repetition += ' (';
                    repetition += t(`plan.week${item.repetition}`);
                    repetition += ')';
                  }

                  let teacher = '';
                  let subject = '';
                  let type = '';
                  let name = '';

                  if (item.teacherSubjectType) {
                    subject += item.teacherSubjectType.subject.name;
                    teacher += item.teacherSubjectType.teacher.academicTitle;
                    teacher += ' ';
                    teacher += item.teacherSubjectType.teacher.firstName;
                    teacher += ' ';
                    teacher += item.teacherSubjectType.teacher.lastName;
                    type += item.teacherSubjectType.type.name;
                  }

                  if (item.name) {
                    name += item.name;
                  }

                  return (
                    <Collapse key={idx}>
                      <Box>
                        <Typography variant="body1" sx={{ display: 'inline' }}>
                          {time}
                        </Typography>
                        <Typography variant="body2" sx={{ display: 'inline' }}>
                          {repetition}
                        </Typography>
                        <Box pl={1}>
                          <Typography variant="body1" color="text.secondary">
                            {subject}
                          </Typography>
                          <Typography variant="body1" color="text.secondary">
                            {name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {teacher}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {type}
                          </Typography>
                        </Box>
                      </Box>
                    </Collapse>
                  );
                })}
              </Stack>
            </Box>
          </Paper>
        ))}
      </Grid>
      <EditDay openDay={openDay} onClose={handleCloseDay} />
    </>
  );
};

export default PlanList;
