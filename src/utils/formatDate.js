import plLocaleFNS from 'date-fns/locale/pl';
import enLocaleFNS from 'date-fns/locale/en-US';
import {
  format,
  formatDistanceToNow as formatDistanceToNowFNS,
  formatDistanceStrict as formatDistanceStrictFNS,
} from 'date-fns';

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

export const formatDistanceToNow = (date, lang) => {
  let string = '';

  switch (lang) {
    case 'pl':
      string = formatDistanceToNowFNS(date, {
        locale: plLocaleFNS,
        addSuffix: true,
      });
      break;
    case 'en':
    default:
      string = formatDistanceToNowFNS(date, {
        locale: enLocaleFNS,
        addSuffix: true,
      });
      break;
  }

  return string;
};

export const formatDistanceStrict = (date, date2, lang) => {
  let string = '';

  switch (lang) {
    case 'pl':
      string = formatDistanceStrictFNS(date, date2, {
        locale: plLocaleFNS,
        addSuffix: true,
      });
      break;
    case 'en':
    default:
      string = formatDistanceStrictFNS(date, date2, {
        locale: enLocaleFNS,
        addSuffix: true,
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
