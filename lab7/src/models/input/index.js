import {createEvent, createStore} from "effector";


export const $input = createStore([
    -1, -1, -1, -1,
    -1, -1, -1, -1,
    -1, -1, -1, -1,
    -1, -1, -1, -1,
])

export const setInput = createEvent()
export const handleInput = createEvent()
