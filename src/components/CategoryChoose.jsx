import React , {useState } from "react";
import Select from "react-select";
import { createApi } from 'unsplash-js';

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
  const [selectedOption, setSelectedOption] = useState(null);
  
  const handleChange = (selectedOption) => {
    setSelectedOption( selectedOption);
    console.log(`Option selected:`, selectedOption);
    unsplash.search.getPhotos({
        query: selectedOption.value,
        page: 1,
        perPage: 10,
        color: 'green',
        orientation: 'portrait',
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