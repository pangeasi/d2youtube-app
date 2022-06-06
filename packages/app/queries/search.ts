import { useQuery } from "react-query";
import { search } from "../services/videos";

export const useSearch = (searchTerm: string) => {
  return useQuery(
    ["search", searchTerm],
    () => search({ query: { q: searchTerm } }),
    {
      enabled: !!searchTerm,
    }
  );
};
