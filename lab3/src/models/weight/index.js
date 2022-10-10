import {createEvent, createStore} from "effector";

const getRandowW = () => [
    0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
].map(() => Math.random() - 0.5)

export const zeroWeight = [1, 2, 3, 4, 5].map(getRandowW)
export const $weight = createStore(zeroWeight)

export const setWeights = createEvent()
