import {createEvent, createStore} from "effector";

const getRandomW = () => (Math.random() - 0.5)
const getRandomWs = () => [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
].map(getRandomW)

export const zeroWeight = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(getRandomWs)
export const $weight = createStore(zeroWeight)

export const setWeights = createEvent()
