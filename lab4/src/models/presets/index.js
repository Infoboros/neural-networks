import {createEvent, createStore} from "effector";

export const $M = createStore([
    {
        x: [
            1, 0, 0, 0, 1,
            0, 1, 0, 1, 0,
            0, 1, 1, 1, 0,
            0, 1, 0, 1, 0,
            1, 0, 0, 0, 1,
        ],
        t: [1, 0],
        S: [],
        diff: 0
    },
    {
        x: [
            0, 0, 1, 0, 0,
            0, 1, 0, 1, 0,
            1, 0, 0, 0, 1,
            1, 1, 1, 1, 1,
            1, 0, 0, 0, 1,
        ],
        t: [0, 1],
        S: [],
        diff: 0
    }
])



export const setSs = createEvent()
export const setDiffs = createEvent()
