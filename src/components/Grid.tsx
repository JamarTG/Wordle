import { useState, useEffect, useRef } from "react";
import Message from "./Message";
import wordSet from "../utils/wordSet";
import wordleSolver from "../utils/wordleSolver";
import React from "react";
import useWordQuery from "./hooks/useWordQuery";
import { Feedback, GameStatus } from "../utils/types";
import Tile from "./Tile";
import checkLetterAgainstSecret from "../utils/checkLetterAgainstSecret";

// const stringToCharacters = (str: string) => {
//   return Array.from(str);
// };

// const createIterableDomElements = (domElement: HTMLElement): Element[] => {
//   return Array.from(domElement.children);
// };

const Grid = () => {
  const wordleGrid = useRef<HTMLElement>(null);
  const [wordleTileIndex, setWordleTileIndex] = useState<number>(0);
  const [userWord, setUserWord] = useState<string>("");
  const [gameOver, setGameOver] = useState<GameStatus>("");

  const { data: secretWord, isLoading, error } = useWordQuery();

  const evaluateWordCorrectness = (userWord: string, secretWord: string) => {
    const feedbackArray: Feedback[] = Array.from(userWord).map(
      (userGuessedLetter, index) => {
        return checkLetterAgainstSecret(
          secretWord,
          secretWord.charAt(index),
          userGuessedLetter
        );
      }
    );

    const squares = Array.from(wordleGrid.current?.children!).slice(
      wordleTileIndex - 4,
      wordleTileIndex + 1
    );

    Array.from(squares).map((square, _) => {});

    return {
      feedbackArray,
      isAllLettersCorrect: feedbackArray.every(
        (feedback) => feedback === "correct"
      ),
    };
  };

  useEffect(() => {
    type CustomKeyboardEvent = KeyboardEvent & { key: string };
    const handleKeyDown = ({ key }: CustomKeyboardEvent) => {
      const shouldRejectKeyStroke = !/^[a-zA-Z]$/.test(key) || gameOver != "";

      if (shouldRejectKeyStroke) {
        return;
      }
      const targetTile = wordleGrid.current?.children[wordleTileIndex];

      if (targetTile) {
        targetTile.textContent = key;
        setUserWord(userWord + key);
      }

      if ((wordleTileIndex + 1) % 5 === 0 && wordleTileIndex) {
        const { feedbackArray, isAllLettersCorrect } = evaluateWordCorrectness(
          userWord + key,
          secretWord as string
        );

        const front = wordleTileIndex - 4;
        console.log(front);

        feedbackArray.map((status: string, index: number) => {
          wordleGrid.current?.children[front + index].classList.add(status);
        });

        setGameOver(isAllLettersCorrect ? "won" : "");
        if (wordleTileIndex === 24 && !isAllLettersCorrect) {
          setGameOver("lost");
        }
        setUserWord("");
      }
      setWordleTileIndex((prevSquareIndex) => prevSquareIndex + 1);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [wordleTileIndex]);

  const iterativeSolver = (
    newWord: string,
    computerSquareIndex: number,
    activeStateOfWords: string[] = wordSet
  ) => {
    Array.from(newWord).forEach((letter) => {
      const targetComponent = wordleGrid.current?.children[computerSquareIndex];
      if (targetComponent) {
        targetComponent.innerHTML = letter;
      }
      computerSquareIndex++;
    });

    const { feedbackArray: statArray, isAllLettersCorrect } =
      evaluateWordCorrectness(newWord, secretWord as string);

    const front = computerSquareIndex - 5;

    statArray.map((status: Feedback, index: number) => {
      wordleGrid.current?.children[front + index].classList.add(status);
    });

    const retryInfo = wordleSolver(newWord, statArray, activeStateOfWords);

    if (!isAllLettersCorrect && computerSquareIndex < 25) {
      iterativeSolver(
        retryInfo.retryWord,
        computerSquareIndex,
        retryInfo.wordSet
      );
    }
  };

  if (isLoading) {
    return <div>Loading ... </div>;
  } else if (error) {
    return <div>Error Fetching Word :|</div>;
  }

  if (!secretWord) {
    return <div>Secret Word not Found</div>;
  }

  return (
    <>
      <button
        className="button"
        onClick={() => {

          
          const isAllSquaresEmpty = Array.from(wordleGrid.current?.children!).every(
            (child) => child.textContent == ""
          );
          isAllSquaresEmpty ?  iterativeSolver("false", 0) : null;
        }}
      >
        Solve 🤖
      </button>
      <Message secretWord={secretWord} gameOver={gameOver} />
      <main id="grid" ref={wordleGrid} key={0}>
        {Array.from({ length: 25 }, (_, index) => (
          <Tile state={"empty"} key={index} identifier={index} />
        ))}
      </main>
    </>
  );
};

export default Grid;
