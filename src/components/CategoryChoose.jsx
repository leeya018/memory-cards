import React , {useState,useContext } from "react";
import Select from "react-select";
import { createApi } from 'unsplash-js';
import {UPDATE_MODE, PHOTO_MODE } from "../actions";

import  {GameContext} from "../context/GameProvider"
import { createCards, shuffleCards } from "../util";

// on your node server
const unsplash = createApi({
  accessKey: 'yFMiYz6izPXCe1s5IxszZEpTJnyG5ARndivYAaRQAHE',
  //...other fetch options
});


//   https://api.unsplash.com/photos/?client_id=yFMiYz6izPXCe1s5IxszZEpTJnyG5ARndivYAaRQAHE/search/photos?page=1&query=office
// https://api.unsplash.com/search/photos?page=1&query=office
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
  { value: "famous", label: "famous" },

];
export default function CategoryChoose() {
  const {game,dispatch} = useContext(GameContext)
  const [selectedOption, setSelectedOption] = useState(null);
  
  const handleChange = (selectedOption) => {
    setSelectedOption( selectedOption);
    console.log(`Option selected:`, selectedOption);
    unsplash.search.getPhotos({
        query: selectedOption.value,
        page: 1,
        perPage: 10,
      }).then(result => {
        if (result.errors) {
          // handle error here
          console.log('error occurred: ', result.errors[0]);
        } else {
            // console.log(result)
            let urls = result.response.results.map((photo,index)=>{
                return photo.urls.regular

            })
            console.log(urls)
            if(urls.length < game.level){
              alert("There are not enought photos for the stage , please choose level : " + urls.length)
            }
            let cards = createCards(game.level,urls)
            let shuffledCards = shuffleCards(cards)
            dispatch({type:UPDATE_MODE,mode:PHOTO_MODE,cards:shuffledCards})
        }
      });




  };
  
  return (
    <>
    <Select value={selectedOption} onChange={handleChange} options={options} />
    </>
  );
}
// yFMiYz6izPXCe1s5IxszZEpTJnyG5ARndivYAaRQAHE
// d-zsZV29YPpWFcvUpSLdKabzofDmhUAlEjDT4wT-JKU