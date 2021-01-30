import React, {useContext } from 'react'
import { UPDATE_LEVEL } from '../actions';
import {GameContext} from "../context/GameProvider"

export default function LevelForm() {
    const {dispatch } = useContext(GameContext)

    function handleOption(e) {
        dispatch({ type: UPDATE_LEVEL, level: parseInt(e.target.value) })
    }

    function createOptions() {
        let arr = []
        for (let i = 1; i < 10; i++) {
            arr.push(<option key={i} value={i }>{i }</option>)
        }
        return arr
    }
    return (
        <div className="level-form">
            <h4>choose your level:</h4>
            <select onChange={handleOption} >
                {
                    createOptions()
                }
            </select>
        </div>
    )
}
