export const getWeekNumber = (d) => {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return weekNo;
};

export const groupBy = (arr, property) => {
  return arr.reduce(function (memo, x) {
    if (!memo[x[property]]) {
      memo[x[property]] = [];
    }
    memo[x[property]].push(x);
    return memo;
  }, []);
};

export const groupItemBy = (array, property) => {
  var hash = {},
    props = property.split('.');
  for (var i = 0; i < array.length; i++) {
    var key = props.reduce(function (acc, prop) {
      return acc && acc[prop];
    }, array[i]);
    if (!hash[key]) hash[key] = [];
    hash[key].push(array[i]);
  }
  return hash;
};
