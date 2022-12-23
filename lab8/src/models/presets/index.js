import {createEvent, createStore} from "effector";

const myPresets = [
    {
        x: [
            1, 1, -1, -1, -1, -1, -1, -1, 1, 1,
            1, 1, 1, -1, -1, -1, -1, 1, 1, 1,
            -1, 1, 1, 1, -1, -1, 1, 1, 1, -1,
            -1, -1, 1, 1, 1, 1, 1, 1, -1, -1,
            -1, -1, -1, 1, 1, 1, 1, -1, -1, -1,
            -1, -1, -1, 1, 1, 1, 1, -1, -1, -1,
            -1, -1, 1, 1, 1, 1, 1, 1, -1, -1,
            -1, 1, 1, 1, -1, -1, 1, 1, 1, -1,
            1, 1, 1, -1, -1, -1, -1, 1, 1, 1,
            1, 1, -1, -1, -1, -1, -1, -1, 1, 1,
        ],
        S: [],
        diff: 0
    },
    {
        x: [-1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, -1, -1, -1, -1, -1, 1, 1, -1, -1, 1, 1, -1, -1, -1, -1, 1, 1, -1, -1, 1, 1, -1, -1, -1, 1, 1, 1, -1, -1, 1, 1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, 1, 1, -1, -1, -1, -1, 1, 1, -1, -1, 1, 1, -1, -1, -1, -1, 1, 1, -1],
        S: [],
        diff: 0
    },
    {
        x: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1],
        S: [],
        diff: 0
    },
    {
        x: [1, 1, 1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, -1, 1, 1, -1, 1, 1, 1, 1, 1, 1, -1, 1, 1, -1, 1, 1, 1, 1, 1, 1, -1, 1, 1, -1, 1, 1, 1, 1, 1, 1, -1, 1, 1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, 1, 1, 1],
        S: [],
        diff: 0
    },
    {
        x: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, 1, 1, -1, -1, 1, 1, 1, -1, -1, -1, 1, 1, -1, -1, -1, 1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, -1],
        S: [],
        diff: 0
    },
]

const examplePresets = [
    {
        x: [
            1, -1, 1,
            1, 1, 1,
            -1, -1, 1,
        ],
        S: [],
        diff: 0
    },
    {
        x: [
            1, 1, 1,
            1, -1, 1,
            1, -1, 1,
        ],
        S: [],
        diff: 0
    }
]
export const $M = createStore(myPresets)


export const setSs = createEvent()
export const setDiffs = createEvent()