const checkLetterAgainstSecret = (
  secretWord: string,
  secretLetter: string,
  guessLetter: string
) => {
  return secretWord.includes(guessLetter)
    ? secretLetter === guessLetter
      ? "correct"
      : "wrong-place"
    : "wrong-letter";
};

export default checkLetterAgainstSecret;
