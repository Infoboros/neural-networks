import {createEvent, createStore} from "effector";


export const $input = createStore([
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
])

export const setInput = createEvent()
export const handleInput = createEvent()
