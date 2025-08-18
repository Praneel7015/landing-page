import { parseISO, format, isValid } from 'date-fns';

export default function Date({ dateString }) {
  if (!dateString || typeof dateString !== 'string') return null;

  // Try strict ISO first (yyyy-MM-dd)
  let date = parseISO(dateString);

  // Fallback for common mistake "yyyy-dd-MM" (e.g., 2005-27-11)
  if (!isValid(date) && /^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    const [y, mm, dd] = dateString.split('-');
    const month = Number(mm);
    const day = Number(dd);
    if (month > 12 && day >= 1 && day <= 31) {
      const swapped = `${y}-${dd}-${mm}`; // swap dd and mm
      const tryDate = parseISO(swapped);
      if (isValid(tryDate)) {
        date = tryDate;
      }
    }
  }

  if (!isValid(date)) {
    // Gracefully render raw string if still invalid to avoid build errors
    return <time>{dateString}</time>;
  }

  return (
    <time dateTime={format(date, 'yyyy-MM-dd')}>{format(date, 'LLLL d, yyyy')}</time>
  );
}