import {getS} from "../teacher";
import {createEvent, createStore} from "effector";

export function average(nums) {
    return nums.reduce((a, b) => (a + b)) / nums.length;
}

export const recognizeFunctions = [
    {
        id: 1,
        recognize: (xs, ws, S1, S0) =>
            getS(xs, ws) > average([S1, S0])
                ? 1
                : -1,
        name: 'Биполярная',
        getFrontier: (S1, S0) => average([S1, S0])
    },
    {
        id: 2,
        recognize: (xs, ws, S1, S0) =>
            getS(xs, ws) > average([S1, S0])
                ? 1
                : 0,
        name: 'Бинарная',
        getFrontier: (S1, S0) => average([S1, S0])
    }
]

export const $recognize = createStore(recognizeFunctions[0])

export const setRecognize = createEvent()
