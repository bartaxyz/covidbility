export const normalizeOutput = (value: number) => {
  return Number((value >= 100 ? 100 : value).toFixed(4)).toString();
};
