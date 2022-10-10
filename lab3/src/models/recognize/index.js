import {getS} from "../teacher";
import {createEvent, createStore} from "effector";

export function average(nums) {
    return nums.reduce((a, b) => (a + b)) / nums.length;
}

export const recognizeFunctions = [
    {
        id: 1,
        recognize: (xs, ws) => getS(xs, ws),
        name: 'Дельта правило'
    },

]

export const $recognize = createStore(recognizeFunctions[0])

export const setRecognize = createEvent()
