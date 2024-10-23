module.exports.formatSize = (bytes) => {
  const sizes = ["Bytes", "KB", "MB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));
  const formattedSize = (bytes / Math.pow(1024, index)).toFixed(2);

  return `${formattedSize} ${sizes[index]}`;
};

module.exports.formatDate = (date) =>
  date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

module.exports.escapeRegex = (string) =>
  string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
