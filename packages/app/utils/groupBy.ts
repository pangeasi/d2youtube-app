export const groupBy = <T>(
  xs: Array<T>,
  key: string
): { [key: string]: T[] } => {
  return xs.reduce(function (rv, x) {
    // @ts-ignore
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
