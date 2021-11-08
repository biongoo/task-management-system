import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { changeColor } from '../../../store/palette-slice';
import { Typography, Grid, Button } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { alpha } from '@mui/material/styles';
import {
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  amber,
  orange,
  deepOrange,
  brown,
} from '@mui/material/colors';

const colors = [
  red[500],
  pink[500],
  purple[500],
  deepPurple[500],
  indigo[500],
  blue[500],
  cyan[500],
  teal[500],
  green[500],
  lightGreen[500],
  lime[500],
  amber[500],
  orange[500],
  deepOrange[500],
  brown[500],
];

const PaletteContentColor = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const paletteColor = useSelector((state) => state.palette.color);

  const changeColorHandler = (color) => {
    localStorage.setItem('color', color);
    dispatch(changeColor(color));
  };

  return (
    <>
      <Typography variant="subtitle2" mt={4}>
        {t('layout.color')}
      </Typography>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={0.5}
        mt={1}
        sx={{ justifyContent: 'space-between' }}
      >
        {colors.map((color) => {
          return (
            <Grid item xs={4} key={color}>
              <Button
                sx={{
                  minWidth: 60,
                  maxWidth: 60,
                  color: color,
                  borderColor:
                    color === paletteColor
                      ? color
                      : (theme) => alpha(theme.palette.primary.light, 0.4),
                  backgroundColor:
                    color === paletteColor ? alpha(color, 0.2) : '',
                  '&:hover': {
                    backgroundColor: alpha(color, 0.3),
                    borderColor:
                      color === paletteColor
                        ? color
                        : (theme) => alpha(theme.palette.primary.light, 0.4),
                  },
                }}
                variant="outlined"
                onClick={() => changeColorHandler(color)}
              >
                <FiberManualRecordIcon
                  sx={{
                    width: 28,
                    height: 28,
                  }}
                />
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default PaletteContentColor;
