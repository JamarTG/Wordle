import wordSet from "./wordSet";
const wordFetcher = async () => {
  try {
    const word = wordSet[Math.floor(Math.random() * wordSet.length)];
    return word;
  } catch (error) {
    throw new Error("Unable to fetch words :(");
  }
};

export default wordFetcher;
