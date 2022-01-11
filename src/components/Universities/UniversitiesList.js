import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import Highlighter from 'react-highlight-words';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography, Box, Stack } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import AddFaculty from './AddFaculty';
import EditFaculty from './EditFaculty';
import DeleteFaculty from './DeleteFaculty';
import Divider from '../UI/Dividers/Divider';
import EditUniversity from './EditUniversity';
import DeleteUniversity from './DeleteUniversity';
import IconButton from '../UI/Buttons/IconButton';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Collapse,
} from '../UI/Acordions/MainAccordion';

const UniversitiesList = ({ universitiesList, search, loading }) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [addFaculty, setAddFaculty] = useState(null);
  const [editingUniversity, setEditingUniversity] = useState(null);
  const paletteColor = useSelector((state) => state.palette.color);
  const [deletingUniversity, setDeletingUniversity] = useState(null);
  const [deletingFaculty, setDeletingFaculty] = useState({
    facultyId: null,
    universityId: null,
  });
  const [editingFaculty, setEditingFaculty] = useState({
    faculty: { id: null, name: null },
    universityId: null,
  });

  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const editUniversityOpenHandler = (university) => {
    setEditingUniversity(university);
  };

  const editUniversityCloseHandler = () => {
    setEditingUniversity(null);
  };

  const deleteUniversityOpenHandler = (university) => {
    setDeletingUniversity(university);
  };

  const deleteUniversityCloseHandler = () => {
    setDeletingUniversity(null);
  };

  const addFacultyOpenHandler = (id) => {
    setAddFaculty(id);
  };

  const addFacultyCloseHandler = () => {
    setAddFaculty(null);
  };

  const editFacultyOpenHandler = ({ faculty, universityId }) => {
    setEditingFaculty({ faculty, universityId });
  };

  const editFacultyCloseHandler = () => {
    setEditingFaculty({
      faculty: { id: null, name: null },
      universityId: null,
    });
  };

  const deleteFacultyOpenHandler = ({ facultyId, universityId }) => {
    setDeletingFaculty({ facultyId, universityId });
  };

  const deleteFacultyCloseHandler = () => {
    setDeletingFaculty({ facultyId: null, universityId: null });
  };

  return (
    <Box>
      <TransitionGroup>
        {universitiesList.map((university) => (
          <Collapse key={university.id}>
            <Accordion
              expanded={expanded === university.id}
              onChange={handleChange(university.id)}
            >
              <AccordionSummary>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={1}
                  sx={{ width: '100%' }}
                >
                  <Typography variant="subtitle1">
                    <Highlighter
                      searchWords={[search]}
                      highlightStyle={{
                        color: paletteColor,
                        backgroundColor: 'inherit',
                      }}
                      textToHighlight={university.name}
                    />
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <IconButton
                      tooltip={t('universities.editUniversity')}
                      onClick={(e) => {
                        e.stopPropagation();
                        editUniversityOpenHandler(university);
                      }}
                      open={editingUniversity === university}
                      Icon={EditIcon}
                      defaultSize={28}
                      circleSize={34}
                    />

                    <IconButton
                      tooltip={t('universities.deleteUniversity')}
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteUniversityOpenHandler(university);
                      }}
                      open={deletingUniversity === university}
                      Icon={DeleteIcon}
                      defaultSize={28}
                      circleSize={34}
                    />
                  </Stack>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <IconButton
                    tooltip={t('universities.addFaculty')}
                    onClick={addFacultyOpenHandler.bind(null, university.id)}
                    open={addFaculty === university.id}
                    Icon={AddCircleIcon}
                    defaultSize={34}
                  />
                </Box>
                <TransitionGroup>
                  {university.faculties
                    .slice()
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((faculty, idx) => (
                      <Collapse key={faculty.id}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          pl={{ xs: 0, sm: 1.5 }}
                          spacing={{ xs: 0.5, md: 2 }}
                          pt={0.5}
                          pb={1}
                        >
                          <Box mt={1} sx={{ wordBreak: 'normal' }}>
                            <Typography variant="body1" color="text.secondary">
                              {faculty.name}
                            </Typography>
                          </Box>
                          <Stack direction="row" spacing={0}>
                            <IconButton
                              tooltip={t('universities.editFaculty')}
                              onClick={editFacultyOpenHandler.bind(null, {
                                faculty,
                                universityId: university.id,
                              })}
                              open={faculty.id === editingFaculty.faculty.id}
                              Icon={EditIcon}
                              defaultSize={24}
                              circleSize={34}
                            />

                            <IconButton
                              tooltip={t('universities.deleteFaculty')}
                              onClick={deleteFacultyOpenHandler.bind(null, {
                                facultyId: faculty.id,
                                universityId: university.id,
                              })}
                              open={faculty.id === deletingFaculty.facultyId}
                              Icon={DeleteIcon}
                              defaultSize={24}
                              circleSize={34}
                            />
                          </Stack>
                        </Stack>
                        {++idx !== university.faculties.length && <Divider />}
                      </Collapse>
                    ))}
                </TransitionGroup>
              </AccordionDetails>
            </Accordion>
          </Collapse>
        ))}
      </TransitionGroup>

      <EditUniversity
        editing={editingUniversity}
        onClose={editUniversityCloseHandler}
      />

      <DeleteUniversity
        deleting={deletingUniversity}
        onClose={deleteUniversityCloseHandler}
      />

      <AddFaculty universityId={addFaculty} onClose={addFacultyCloseHandler} />

      <EditFaculty
        editing={editingFaculty.faculty}
        universityId={editingFaculty.universityId}
        onClose={editFacultyCloseHandler}
      />

      <DeleteFaculty
        deleting={deletingFaculty.facultyId}
        universityId={deletingFaculty.universityId}
        onClose={deleteFacultyCloseHandler}
      />

      {!universitiesList.length && search && (
        <Box sx={{ textAlign: 'center' }}>
          <Stack>
            <Typography variant="h6">{t('global.notFound')}</Typography>
            <Typography>
              {t('global.notFoundDesc', { search: search })}
            </Typography>
          </Stack>
        </Box>
      )}

      {!universitiesList.length && !search && !loading && (
        <Box sx={{ textAlign: 'center' }}>
          <Stack>
            <Typography variant="h6">{t('universities.letsAdd')}</Typography>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default UniversitiesList;
