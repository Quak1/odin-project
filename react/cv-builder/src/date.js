export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "short",
  });
}
