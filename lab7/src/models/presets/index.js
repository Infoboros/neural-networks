import {createEvent, createStore} from "effector";


export const $M = createStore([
    {
        x: [
            0, 0, 0, 1
        ],
        S: [],
        diff: 0
    },
    {
        x: [
            0, 0, 1, 1
        ],
        S: [],
        diff: 0
    },
    {
        x: [
            1, 0, 0, 0
        ],
        S: [],
        diff: 0
    },
    {
        x: [
            1, 1, 0, 0
        ],
        S: [],
        diff: 0
    }
])


export const setSs = createEvent()
export const setDiffs = createEvent()
