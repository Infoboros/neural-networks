import {createEvent, createStore} from "effector";


export const $M = createStore([
    {
        x: [
            0, 1, 1, 1, 0,
            0, 1, 0, 1, 0,
            0, 1, 0, 1, 0,
            1, 1, 1, 1, 1,
            1, 1, 0, 1, 1,
        ],
        t: {
            bipolar: 1,
            bin: 1
        },
        S: 0
    },
    {
        x: [
            0, 0, 0, 0, 0,
            0, 1, 1, 1, 0,
            0, 1, 0, 1, 0,
            1, 1, 1, 1, 1,
            1, 0, 0, 0, 1,
        ],
        t: {
            bipolar: 1,
            bin: 1
        },
        S: 0
    },
    {
        x: [
            0, 1, 1, 1, 1,
            0, 1, 0, 0, 0,
            1, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 1, 1, 1, 1,
        ],
        t: {
            bipolar: -1,
            bin: 0
        },
        S: 0
    },
    {
        x: [
            0, 1, 1, 1, 1,
            1, 1, 0, 0, 0,
            1, 1, 0, 0, 0,
            1, 1, 0, 0, 0,
            0, 1, 1, 1, 1,
        ],
        t: {
            bipolar: -1,
            bin: 0
        },
        S: 0
    },
])


export const setSs = createEvent()
