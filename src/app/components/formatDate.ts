export function formatDateToDDMMYYYY(date: string): string {
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
}

export function formatDateFromDB(specialDate: {date: string}) {
  const date_ = new Date(specialDate.date);
  const day = String(date_ .getDate()).padStart(2, '0');
  const month = String(date_ .getMonth() + 1).padStart(2, '0');
  const year = date_ .getFullYear();

  const newSpecialDate = {...specialDate, date: `${day}/${month}/${year}`};
  return newSpecialDate
}
