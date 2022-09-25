import {createEvent, createStore} from "effector";

export const $weight = createStore([
    0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
])

export const setWeights = createEvent()
