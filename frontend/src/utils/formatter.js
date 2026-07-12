export const formatCurrency = (value) => {
  if (value == null) return "N/A";
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
};

export const formatPercentage = (value) => {
  if (value == null) return "N/A";
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2
  }).format(value / 100);
};

export const formatLargeNumber = (value) => {
  if (value == null) return "N/A";
  return new Intl.NumberFormat('en-US', {
    notation: "compact",
    compactDisplay: "short"
  }).format(value);
};
