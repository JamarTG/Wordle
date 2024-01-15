import { KeyboardEventHandler, useState } from "react"

const Square = ( {identifier : _identifier , state = ""} : { identifier : number , state : "" | "wrong-letter" | "wrong-place" | "correct"  }) => {

  const [letter, _ ] = useState<string>("");

  return (
    <div className={`square ${state}`} key={_identifier} onClick={() => { }}>
      {letter.toLocaleUpperCase()}
    </div>
  )
}

export default Square

