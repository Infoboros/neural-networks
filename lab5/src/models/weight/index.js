import {createEvent, createStore} from "effector";

const getRandomW = () => (Math.random() - 0.5)

const getRandowWIH = () => [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
].map(getRandomW)

const hhw = [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
]
const getHHW = () => hhw.map(getRandomW)

const ihw = [
    0
]

const getRandowWHO = () => ihw.map(getRandomW)

const how = [1, 2, 3, 4, 5]

const zeroWeights = [
    [
        [0.2, -0.3],
        [0.3, 0.2]
    ],
    [
        [-0.1, -0.1],
        [0.2, -0.3]
    ],
    [[0.4, -0.2]]
]

export const $weight = createStore(zeroWeights)

export const setWeights = createEvent()
