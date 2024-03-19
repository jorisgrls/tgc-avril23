export const makePlural = (str: string, num: number): string => {
  if (num > 1) return `${str}s`;
  return str;
};
