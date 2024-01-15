import axios from "axios"

const wordFetcher = async () => {

  try {
    const word = await axios.request({
      method: 'GET',
      url: 'https://random-word-api.herokuapp.com/word?length=5'
    });
  
    const theWord = word.data.join("").toString()
    console.log(theWord);
    return theWord;
  }
  catch (error) {
    throw new Error("Unable to fetch words :(");
  }
}


export default wordFetcher;