import { Feedback } from "./types";

const wordleSolver = (
  previousWord: string,
  previousTryResult: Feedback [],
  stateOfWords: string[]
) => {
  previousTryResult.map((result: string, index: number) => {
    if (result === "correct") {
      stateOfWords = stateOfWords.filter(
        (word) => word[index] === previousWord[index]
      );
    } else if (result === "wrong-place") {
      stateOfWords = stateOfWords.filter(
        (word) => word[index] !== previousWord[index]
      );
      stateOfWords = stateOfWords.filter((word) =>
        Array.from(word).includes(previousWord[index])
      );
    } else {
      stateOfWords = stateOfWords.filter(
        (word) => !word.includes(previousWord[index])
      );
    }
  });

  return {
    retryWord: stateOfWords[Math.floor(Math.random() * stateOfWords.length)],
    wordSet: stateOfWords,
  };
};

export default wordleSolver;
