export const CLIENT_ID = '22CDGB';
export const CLIENT_SECRET = 'b891b07bfed49c9d8f5a2d2ad2831a78';

export const fitbitHeaderAppAuthorization = Buffer.from(
  `${CLIENT_ID}:${CLIENT_SECRET}`,
).toString('base64');

export const getDatesBetweenDates = (startDate: Date, endDate: Date) => {
  let dates: any[] = [];

  const theDate = new Date(startDate);

  while (theDate < endDate) {
    dates = [...dates, new Date(theDate)];
    theDate.setDate(theDate.getDate() + 1);
  }
  dates = [...dates, endDate];

  let formated: string[] = [];
  dates.forEach((date) => {
    formated = [...formated, formatDate(date)];
  });

  return formated;
};

const formatDate = (date: Date) => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('.');
};
