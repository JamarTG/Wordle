import axios from "axios"

const wordFetcher = async () => {

  const word = await axios.request({
    method: 'GET',
    url: 'https://jsonplaceholder.typicode.com/todos/1',
    // headers: {
    //   'X-RapidAPI-Key': '329a6f123dmsh6c85a34279eb6aap123888jsn7274febc1392',
    //   'X-RapidAPI-Host': 'wordle-game-api1.p.rapidapi.com'
    // }
  });
  console.log('date')
  return word.data;
}


export default wordFetcher;