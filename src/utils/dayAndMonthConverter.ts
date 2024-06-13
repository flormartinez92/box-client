export const dayAndMonthConverter = (date: string | Date) => {
  const newDate = new Date(date);

  const dayOfWeek = new Date(date).getDay();
  const numberOfDay = newDate.getDate();

  const day = isNaN(dayOfWeek)
    ? null
    : ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vier', 'Sáb'][dayOfWeek];

  const month = newDate.getMonth() + 1;

  const monthName = isNaN(month)
    ? null
    : [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre'
      ][month - 1];

  const result = {
    day: `${day?.toLowerCase()}/${numberOfDay}`,
    month: monthName?.toUpperCase()
  };

  return result;
};
