import { format } from 'date-fns';
import React, { useState } from 'react';
import plLocaleFNS from 'date-fns/locale/pl';
import { useTranslation } from 'react-i18next';
import enLocaleFNS from 'date-fns/locale/en-US';
import EditIcon from '@mui/icons-material/Edit';
import { TransitionGroup } from 'react-transition-group';
import { Paper, Grid, Typography, Stack, Box, Collapse } from '@mui/material';

import EditDay from './EditDay';
import Divider from '../UI/Dividers/Divider';
import IconButton from '../UI/Buttons/IconButton';

const buildTime = (date, lang) => {
  let stringTime = '';

  switch (lang) {
    case 'pl':
      stringTime = format(date, 'HH:mm', {
        locale: plLocaleFNS,
      });
      break;
    case 'en':
    default:
      stringTime = format(date, "h:mmaaaaa'm'", {
        locale: enLocaleFNS,
      });
      break;
  }

  return stringTime;
};

const PlanList = ({ planList }) => {
  const { t, i18n } = useTranslation();
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
                  const date = new Date();

                  date.setHours(item.startTime.split(':')[0]);
                  date.setMinutes(item.startTime.split(':')[1]);

                  time += buildTime(date, i18n.language);
                  time += ' - ';

                  date.setHours(item.endTime.split(':')[0]);
                  date.setMinutes(item.endTime.split(':')[1]);

                  time += buildTime(date, i18n.language);

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
