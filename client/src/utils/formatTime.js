export function formatTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours} hour(s) and ${remainingMinutes} minute(s)`;
}
