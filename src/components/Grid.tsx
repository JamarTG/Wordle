import Square from "./Square";
import wordFetcher from "../utils/wordFetcher";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import wordSet from "../utils/wordSet";
import wordleSolver from "../utils/wordleSolver";

const Grid = () => {
  const gridContainerRef = useRef<HTMLElement>(null);
  const [currentSquareIndex, setCurrentSquareIndex] = useState<number>(0);
  const [userWord, setUserWord] = useState<string>("");
  const [gameOver, setGameOver] = useState<"won" | "lost" | "">("");

  const {
    data: word,
    isLoading,
    error,
  } = useQuery({
    queryFn: wordFetcher,
    queryKey: ["word"],
    refetchOnWindowFocus: false,
  });

  const evaluateWordCorrectness = (userWord: string, correctWord: string) => {
    let allCorrect = true;
    const correctWordArray = Array.from(correctWord);
    const userWordArray = Array.from(userWord);
    const squareStats: ("correct" | "wrong-place" | "wrong-letter")[] =
      userWordArray.map((letter, index) => {
        const isCorrectLetter = correctWordArray.includes(letter);
        if (isCorrectLetter) {
          const isCorrectLetterAndPlace = correctWord[index] == letter;
          if (isCorrectLetterAndPlace) {
            return "correct";
          } else {
            allCorrect = false;
            return "wrong-place";
          }
        } else {
          allCorrect = false;
          return "wrong-letter";
        }
      });
    return { squareStats, allCorrect };
  };

  useEffect(() => {
    type CustomKeyboardEvent = KeyboardEvent & { key: string };
    const handleKeyDown = (event: CustomKeyboardEvent) => {
      if (!/^[a-zA-Z]$/.test(event.key) || gameOver != "") {
        return;
      }
      const targetComponent =
        gridContainerRef.current?.children[currentSquareIndex];

      if (targetComponent) {
        targetComponent.innerHTML = event.key;
        setUserWord(userWord + event.key);
      }

      if ((currentSquareIndex + 1) % 5 === 0 && currentSquareIndex) {
        const { squareStats: statArray, allCorrect } = evaluateWordCorrectness(
          userWord + event.key,
          word as string
        );

        const front = currentSquareIndex - 4;
        statArray.map((status: string, index: number) => {
          gridContainerRef.current?.children[front + index].classList.add(
            status
          );
        });

        setGameOver(allCorrect ? "won" : "");
        if (currentSquareIndex === 24 && !allCorrect) {
          setGameOver("lost");
        }
        setUserWord("");
      }
      setCurrentSquareIndex((prevSquareIndex) => prevSquareIndex + 1);
    };
    
    document.addEventListener("keydown", handleKeyDown);
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentSquareIndex]);

  const computerSolve = () => {
    const iterativeSolver = (
      newWord: string,
      computerSquareIndex: number,
      activeStateOfWords: string[] = wordSet
    ) => {
      Array.from(newWord).forEach((letter) => {
        const targetComponent =
          gridContainerRef.current?.children[computerSquareIndex];
        if (targetComponent) {
          targetComponent.innerHTML = letter;
        }
        computerSquareIndex++;
      });

      const { squareStats: statArray, allCorrect } = evaluateWordCorrectness(
        newWord,
        word as string
      );

      const front = computerSquareIndex - 5;

      statArray.map((status: string, index: number) => {
        gridContainerRef.current?.children[front + index].classList.add(status);
      });

      const retryInfo = wordleSolver(newWord, statArray, activeStateOfWords);

      if (!allCorrect && computerSquareIndex < 25) {
        iterativeSolver(
          retryInfo.retryWord,
          computerSquareIndex,
          retryInfo.wordSet
        );
      }
    };

    iterativeSolver("false", 0);
  };

  if (isLoading) {
    return <div>Loading ... </div>;
  } else if (error) {
    return <div>Error Fetching Word :|</div>;
  }

  return (
    <>
      <button onClick={computerSolve}>Let Computer Solve</button>
      <h2 className="message-h1">
        {gameOver === "won"
          ? "You win :)"
          : gameOver === "lost"
          ? "you lose :("
          : ""}
      </h2>
      <main id="grid" ref={gridContainerRef} key={0}>
        {Array.from({ length: 25 }, (_, index) => (
          <Square state={""} key={index} identifier={index} />
        ))}
      </main>
    </>
  );
};

export default Grid;
