import {getS} from "../teacher";
import {createEvent, createStore} from "effector";

export function average(nums) {
    return nums.reduce((a, b) => (a + b)) / nums.length;
}

export function divider(a, b, part) {
    return (a + part * b) / (1. + part)
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
    },
    {
        id: 3,
        recognize: (xs, ws, S1, S0) => {
            console.log(S1, S0)
            const averageS = average([S1, S0])
            console.log('avgS', averageS)
            const S = getS(xs, ws) - averageS
            console.log('S', S)
            const T =
                -Math.log((1 - 0.9) / 0.9)
                /
                (divider(S0, S1, 2.) - averageS)
            console.log('T', T)
            return 1/ (1 + Math.exp(-T*S))
        },
        name: 'Бинарная Сигмоидальная',
        getFrontier: (S1, S0) => `Q1=${divider(S0, S1, 1/2)};Q2=${divider(S0, S1, 2)}`
    }
]

export const $recognize = createStore(recognizeFunctions[1])

export const setRecognize = createEvent()
