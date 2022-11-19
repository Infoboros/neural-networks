import {createEvent, createStore} from "effector";

const getRandowW = () => [
    0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
]

export const zeroWeight = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(getRandowW)
export const $weight = createStore(zeroWeight)

export const setWeights = createEvent()
