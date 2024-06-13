export const convertDateToString = (date: Date) => {
  const newDate = new Date(date);
  return newDate.toISOString();
};
