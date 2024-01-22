import wordFetcher from "../../utils/wordFetcher";
import { useQuery } from "@tanstack/react-query";

const useWordQuery = () => {
  const queryObject = useQuery({
    queryFn: wordFetcher,
    queryKey: ["word"],
    refetchOnWindowFocus: false,
  });
  return queryObject;
};

export default useWordQuery;
