import React from 'react'
import { UPDATE_LEVEL } from '../actions';
import { dataCards } from '../util';

export default function LevelForm({ dispatch, onHandleTimer }) {

    function handleTimer(e) {
        onHandleTimer(0)
        dispatch({ type: UPDATE_LEVEL, payload: { level: parseInt(e.target.value) } })
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
            <h4>choose your level:</h4>
            <select onChange={handleTimer} >
                {
                    createOptions()
                }
            </select>
        </div>
    )
}
