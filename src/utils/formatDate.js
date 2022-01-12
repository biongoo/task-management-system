import { format } from 'date-fns';
import plLocaleFNS from 'date-fns/locale/pl';
import enLocaleFNS from 'date-fns/locale/en-US';

export const buildDateTime = (date, lang) => {
  let string = '';

  switch (lang) {
    case 'pl':
      string = format(date, 'yyyy.MM.dd HH:mm', {
        locale: plLocaleFNS,
      });
      break;
    case 'en':
    default:
      string = format(date, "yyyy/MM/dd h:mmaaaaa'm'", {
        locale: enLocaleFNS,
      });
      break;
  }

  return string;
};

export const buildDate = (date, lang) => {
  let string = '';

  switch (lang) {
    case 'pl':
      string = format(date, 'yyyy.MM.dd', {
        locale: plLocaleFNS,
      });
      break;
    case 'en':
    default:
      string = format(date, 'yyyy/MM/dd', {
        locale: enLocaleFNS,
      });
      break;
  }

  return string;
};

export const buildFullDate = (date, lang) => {
  let string = '';

  switch (lang) {
    case 'pl':
      string = format(date, 'dd MMMM yyyy', {
        locale: plLocaleFNS,
      });
      break;
    case 'en':
    default:
      string = format(date, 'dd MMMM yyyy', {
        locale: enLocaleFNS,
      });
      break;
  }

  return string;
};

export const buildTime = (date, lang) => {
  let string = '';

  switch (lang) {
    case 'pl':
      string = format(date, 'HH:mm', {
        locale: plLocaleFNS,
      });
      break;
    case 'en':
    default:
      string = format(date, "h:mmaaaaa'm'", {
        locale: enLocaleFNS,
      });
      break;
  }

  return string;
};

export const getHour = (totalMinutes, t) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return hours
    ? minutes
      ? t('homework.time', { h: hours, m: minutes })
      : t('homework.timeWoM', { h: hours })
    : t('homework.timeWoH', { m: minutes });
};

// locales:
// Dashboard => Calendar
