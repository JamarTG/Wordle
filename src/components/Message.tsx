import React from "react";

const Message = ({ gameOver, secretWord }) => {
  return (
    <h2 className="message-h1">
      {gameOver === "won" ? (
        <span className="win">You win :)</span>
      ) : gameOver === "lost" ? (
        <div className="lose">{`You lose :( The word was ${secretWord}`}</div>
      ) : (
        ""
      )}
    </h2>
  );
};

export default Message;
