import {createEvent, createStore} from "effector";
import {getDirectPropagation, getS} from "../teacher";

export const recognizeFunctions = [
    {
        id: 1,
        recognize: getDirectPropagation,
        name: 'Распознавание'
    },

]

export const $recognize = createStore(recognizeFunctions[0])

export const setRecognize = createEvent()
