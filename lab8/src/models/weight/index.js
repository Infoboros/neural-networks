import {createEvent, createStore} from "effector";

const getRandomW = () => (Math.random() - 0.5)
const getRandomWs = () => [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
]

const getRandomExWs = () => [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
]

export const zeroWeight = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(getRandomExWs)
export const $weight = createStore(zeroWeight)

export const setWeights = createEvent()
