import {createEvent, createStore} from "effector";

const getRandowW = () => [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
]

export const zeroWeight = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(getRandowW)
export const $weight = createStore([
    [0.7, 0.4, 0.5, 0.2],
    [0.6, 0.1, 0.5, 0.9]
])

export const setWeights = createEvent()
