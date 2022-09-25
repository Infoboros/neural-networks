import {createEvent, createStore} from "effector";


export const $info = createStore({
    countOperations: null
})

export const setCountOperations = createEvent()
