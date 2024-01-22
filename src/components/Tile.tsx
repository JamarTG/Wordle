import React, { useState } from "react";
import { Feedback } from "../utils/types";

const Tile = ({
  identifier: _identifier,
  state = "empty",
}: {
  identifier: number;
  state: Feedback;
}) => {
  const [letter, _] = useState<string>("");

  return (
    <div className={`square ${state}`} key={_identifier} onClick={() => {}}>
      {letter.toLocaleUpperCase()}
    </div>
  );
}

export default Tile;
