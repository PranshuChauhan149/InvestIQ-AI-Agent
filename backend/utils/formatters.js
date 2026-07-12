export const formatCurrency = (value) => {
  if (value === null || value === undefined) return null;

  const absValue = Math.abs(value);

  if (absValue >= 1e12) return `$${(value / 1e12).toFixed(2)} Trillion`;
  if (absValue >= 1e9) return `$${(value / 1e9).toFixed(2)} Billion`;
  if (absValue >= 1e6) return `$${(value / 1e6).toFixed(2)} Million`;
  if (absValue >= 1e3) return `$${(value / 1e3).toFixed(2)} Thousand`;

  return `$${value.toFixed(2)}`;
};

export const formatPercent = (value) => {
  if (value === null || value === undefined) return null;
  return `${value.toFixed(2)}%`;
};

export const formatNumber = (value, decimals = 2) => {
  if (value === null || value === undefined) return null;
  return value.toFixed(decimals);
};