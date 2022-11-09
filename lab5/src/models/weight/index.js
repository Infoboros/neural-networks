import {createEvent, createStore} from "effector";

const getRandomW = () => (Math.random() - 0.5)/10

const getRandowWIH = () => [
    0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
].map(getRandomW)

const hhw = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
]
const getHHW = () => [...hhw.map(getRandomW), getRandomW()]

const ihw = [
    0, 0,
    0, 0,
]

const getRandowWHO = () => [...ihw.map(getRandomW), getRandomW()]

const how = [1, 2, 3, 4, 5]

const zeroWeights = [
    hhw.map(getRandowWIH),
    ihw.map(getHHW),
    how.map(getRandowWHO)
]

export const $weight = createStore(zeroWeights)

export const setWeights = createEvent()
