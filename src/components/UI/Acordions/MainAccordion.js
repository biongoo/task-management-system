import { alpha, styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';

import {
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  Collapse as MuiCollapse,
} from '@mui/material';

export const Collapse = styled((props) => <MuiCollapse {...props} />)(() => ({
  '&:not(:last-child) .MuiAccordion-root': {
    borderBottom: 0,
  },
  '&:before .MuiAccordion-root': {
    display: 'none',
  },
  '&:first-of-type .MuiAccordion-root': {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  '&:last-child .MuiAccordion-root': {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
}));

export const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${alpha(theme.palette.primary.light, 0.4)}`,
}));

export const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon
        sx={{ fontSize: '0.9rem', color: 'primary.light' }}
      />
    }
    {...props}
  />
))(({ theme }) => ({
  flexDirection: 'row-reverse',

  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
    '& .MuiSvgIcon-root': { color: alpha(theme.palette.secondary.main, 1) },
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(1),
  paddingLeft: theme.spacing(2),
  borderTop: `1px solid ${alpha(theme.palette.primary.light, 0.2)}`,
}));
