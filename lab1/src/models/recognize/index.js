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
            const S = getS(xs, ws)
            const T =
                -Math.log((1 - 0.9) / 0.9)
                /
                average([divider(S1, S0, 1. / 3.), divider(S1, S0, 2. / 3.)])
            return 1/ (1 + Math.exp(-T*S))
        },
        name: 'Бинарная Сигмоидальная',
        getFrontier: (S1, S0) => `Q1=${divider(S0, S1, 1. / 3.)};Q2=${divider(S0, S1, 2. / 3.)}`
    }
]

export const $recognize = createStore(recognizeFunctions[0])

export const setRecognize = createEvent()
