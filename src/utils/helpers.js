import moment from 'moment';

export const sortRatesByLabel = (rateA,rateB) => {
  const dateA = moment(rateA[0]);
  const dateB = moment(rateB[0]);
  if(dateA.isSame(dateB)) return 0;
  if(dateA.isBefore(dateB)) return -1;
  if(dateA.isAfter(dateB)) return 1;
}