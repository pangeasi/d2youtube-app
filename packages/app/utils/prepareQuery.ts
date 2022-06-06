import qs from "qs";
export const prepareQuery = <T>(query: T) => {
  return qs.stringify(query, { skipNulls: true, addQueryPrefix: true });
};
