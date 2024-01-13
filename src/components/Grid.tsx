import Square from "./Square";
import wordFetcher from "../utils/wordFetcher";
import { useQuery } from "@tanstack/react-query";

const Grid = () => {
  const { data: word, isLoading } = useQuery({
    queryFn: wordFetcher
    ,
    queryKey: ["word"],
  });

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <main id="grid">
      {JSON.stringify(word)}
      <Square />
      <Square />
      {/* Add more Square components as needed */}
    </main>
  );
};

export default Grid;
