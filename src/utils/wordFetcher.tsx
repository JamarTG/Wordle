import axios from "axios"
import wordSet from './wordSet'
const wordFetcher = async () => {

  try {
    // const word = await axios.request({
    //   method: 'GET',
    //   url: ''
    // });

    // console.log(word);
  
    const word = wordSet[Math.floor(Math.random() * wordSet.length)] 
    console.log(word);
    return word;
  }
  catch (error) {
    throw new Error("Unable to fetch words :(");
  }
}


export default wordFetcher;