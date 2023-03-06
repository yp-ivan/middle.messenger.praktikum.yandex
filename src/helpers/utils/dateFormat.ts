export const dateFormat = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const today = new Date();
  if (isToday(date, today)) {
    return getTime(date);
  }
  return date.toLocaleDateString() + ' ' + getTime(date);
}

const isToday = ( d1: Date, d2: Date ): boolean =>  {
  return d1.getUTCFullYear() === d2.getUTCFullYear() &&
    d1.getUTCMonth() === d2.getUTCMonth() &&
    d1.getUTCDate() === d2.getUTCDate();
}

const getTime = (date: Date): string => {
  return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`
}
