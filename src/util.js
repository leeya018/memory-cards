import { v4 as uuidv4 } from "uuid";

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

export const createCards = (num) =>{
  const arr =  [...ALL_COLORS.slice(0,num),...ALL_COLORS.slice(0,num)].map((color, key) => ({
    id: uuidv4(),
    open: false,
    color,
    lock: false,
    tempLock: false,
  }));
  return arr
}

export const shuffleCards = (cards)=>{
  return  cards.sort(() => Math.random() - 0.5);
}


export function getGrid(game) {
  if (game.level === 1 || game.level === 2) {
    return { cols: "40% 40%", rows: "30% 30% 30%" };
  } else if (game.level === 3 || game.level === 4) {
    return { cols: "30% 30% 30%", rows: "30% 30% 30%" };
  } else if (game.level === 5 || game.level === 6) {
    return { cols: "22% 22% 22% 22%", rows: "30% 30% 30%" };
  } else if (game.level === 7 || game.level === 8) {
    return { cols: "22% 22% 22% 22%", rows: "22% 22% 22% 22%" };
  } else {
    return { cols: "15% 15% 15% 15% 15%", rows: "22% 22% 22% 22%" };
  }
}

const biggestScore = 1000000

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