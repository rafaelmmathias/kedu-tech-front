export const displayPercentage = (value?: number) => {
  if (typeof value !== "number") return "-";
  return `${value} %`;
};
