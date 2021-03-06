import { v4 as uuidv4 } from "uuid";
import { createApi } from "unsplash-js";

const ALL_COLORS = [
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "brown",
  "gray",
  "darkkhaki",
  "skyblue",
];

export const BLACK_IMAGE =
  "https://coolbackgrounds.io/images/backgrounds/black/pure-black-background-f82588d3.jpg";

export const createCards = (num, arr = ALL_COLORS) => {
  return [...arr.slice(0, num), ...arr.slice(0, num)].map((color, key) => ({
    id: uuidv4(),
    open: false,
    color,
    lock: false,
    tempLock: false,
  }));
};

export const shuffleCards = (cards) => {
  return cards.sort(() => Math.random() - 0.5);
};

export function getGrid(level) {
  if (level === 1 || level === 2) {
    return { cols: "40% 40%", rows: "30% 30% 30%" };
  } else if (level === 3 || level === 4) {
    return { cols: "30% 30% 30%", rows: "30% 30% 30%" };
  } else if (level === 5 || level === 6) {
    return { cols: "22% 22% 22% 22%", rows: "30% 30% 30%" };
  } else if (level === 7 || level === 8) {
    return { cols: "22% 22% 22% 22%", rows: "22% 22% 22% 22%" };
  } else {
    return { cols: "15% 15% 15% 15% 15%", rows: "22% 22% 22% 22%" };
  }
}

export async function getPhotos(category) {
  console.log(process.env)
  const unsplash = createApi({
    accessKey: process.env.REACT_APP_UNSPLASH_KEY,
    //...other fetch options
  });
  let result;
  try {
    result = await unsplash.search.getPhotos({
      query: category,
      page: 1,
      perPage: 10,
    });
    let urls = result.response.results.map((photo, index) => {
      return photo.urls.regular;
    });
    return urls
  } catch (e) {
    alert(e.message);
  }

}
const biggestScore = 1000000;

export const storeScore = {
  1: biggestScore,
  2: biggestScore,
  3: biggestScore,
  4: biggestScore,
  5: biggestScore,
  6: biggestScore,
  7: biggestScore,
  8: biggestScore,
  9: biggestScore,
  10: biggestScore,
};

// check a match between 2 cards
export function isMatch(arr) {
  let [c1, c2] = arr;
  return c1.color === c2.color;
}
