import { format } from 'date-fns';
import plLocaleFNS from 'date-fns/locale/pl';
import enLocaleFNS from 'date-fns/locale/en-US';

export const buildDateTime = (date, lang) => {
  let stringTime = '';

  switch (lang) {
    case 'pl':
      stringTime = format(date, 'yyyy.MM.dd HH:mm', {
        locale: plLocaleFNS,
      });
      break;
    case 'en':
    default:
      stringTime = format(date, "yyyy/MM/dd h:mmaaaaa'm'", {
        locale: enLocaleFNS,
      });
      break;
  }

  return stringTime;
};

export const buildDate = (date, lang) => {
  let stringTime = '';

  switch (lang) {
    case 'pl':
      stringTime = format(date, 'yyyy.MM.dd', {
        locale: plLocaleFNS,
      });
      break;
    case 'en':
    default:
      stringTime = format(date, 'yyyy/MM/dd', {
        locale: enLocaleFNS,
      });
      break;
  }

  return stringTime;
};

export const buildTime = (date, lang) => {
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
