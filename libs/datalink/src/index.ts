export const sum = (...args: number[]): number => {
  return args.reduce((a, b) => a + b, 0);
};
