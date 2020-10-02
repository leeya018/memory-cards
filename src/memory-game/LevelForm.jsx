import React from 'react'
import { ACTIONS } from './App';
import { dataCards } from './data';

export default function LevelForm({ dispatch, onHandleTimer }) {

    function handleTimer(e) {
        onHandleTimer(0)
        dispatch({ type: ACTIONS.UPDATE_LEVEL, payload: { level: e.target.value } })
    }

    function createOptions() {
        let arr = []
        for (let i = 0; i < dataCards.length / 2; i++) {
            arr.push(<option value={i + 1}>{i + 1}</option>)
        }
        return arr
    }
    return (
        <div className="level-form">
            <select onChange={handleTimer} >
                {
                    createOptions()
                }
            </select>
        </div>
    )
}
