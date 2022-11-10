import {createEvent, createStore} from "effector";


export const $M = createStore([
    {
        x: [
            0.5, 0.3
        ],
        t: [1],
        S: [],
        diff: 0
    },
])


export const setSs = createEvent()
export const setDiffs = createEvent()
