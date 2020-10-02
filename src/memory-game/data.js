import { v4 as uuidv4 } from "uuid"

export const dataCards = [
    { id: uuidv4(), open: false, color: "red", lock: false, tempLock: false },
    { id: uuidv4(), open: false, color: "red", lock: false, tempLock: false },
    { id: uuidv4(), open: false, color: "blue", lock: false, tempLock: false },
    { id: uuidv4(), open: false, color: "blue", lock: false, tempLock: false },
    { id: uuidv4(), open: false, color: "green", lock: false, tempLock: false },
    { id: uuidv4(), open: false, color: "green", lock: false, tempLock: false },
    { id: uuidv4(), open: false, color: "yellow", lock: false, tempLock: false },
    { id: uuidv4(), open: false, color: "yellow", lock: false, tempLock: false },
    { id: uuidv4(), open: false, color: "purple", lock: false, tempLock: false },
    { id: uuidv4(), open: false, color: "purple", lock: false, tempLock: false },
    { id: uuidv4(), open: false, color: "brown", lock: false, tempLock: false },
    { id: uuidv4(), open: false, color: "brown", lock: false, tempLock: false },
    { id: uuidv4(), open: false, color: "gray", lock: false, tempLock: false },
    { id: uuidv4(), open: false, color: "gray", lock: false, tempLock: false },
    { id: uuidv4(), open: false, color: "darkkhaki", lock: false, tempLock: false },
    { id: uuidv4(), open: false, color: "darkkhaki", lock: false, tempLock: false },
    { id: uuidv4(), open: false, color: "skyblue", lock: false, tempLock: false },
    { id: uuidv4(), open: false, color: "skyblue", lock: false, tempLock: false }

]


export function getGrid(game) {
    console.log('game.level', game.level)
    if (game.level === 1 || game.level === 2) {
        return { cols: "40% 40%", rows: "30% 30% 30%" }
    } else if (game.level === 3 || game.level === 4) {
        return { cols: "30% 30% 30%", rows: "30% 30% 30%" }
    } else if (game.level === 5 || game.level === 6) {
        return { cols: "22% 22% 22% 22%", rows: "30% 30% 30%" }
    } else if (game.level === 7 || game.level === 8) {
        return { cols: "22% 22% 22% 22%", rows: "22% 22% 22% 22%" }
    } else {
        return { cols: "15% 15% 15% 15% 15%", rows: "22% 22% 22% 22%" }
    }
}



export const storeScore = {
    1: 1000000,
    2: 1000000,
    3: 1000000,
    4: 1000000,
    5: 1000000,
    6: 1000000,
    7: 1000000,
    8: 1000000,
    9: 1000000,
    10: 1000000,

}