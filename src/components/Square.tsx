import { useState } from "react"
const Square = () => {

  const [color, setColor] = useState();
  const [letter, setLetter] = useState();

  return (
    <button className="square" onClick={() => {
      console.log("color should be", color);
      console.log("letter should be Letter")
    }}>
      
      {letter}
      {color}
    </button>
  )
}

export default Square

