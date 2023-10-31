export default function isToday(epochMilliseconds: number) {
  const currentDate = new Date();
  const providedDate = new Date(epochMilliseconds);

  return (
    currentDate.getFullYear() === providedDate.getFullYear() &&
    currentDate.getMonth() === providedDate.getMonth() &&
    currentDate.getDate() === providedDate.getDate()
  );
}
