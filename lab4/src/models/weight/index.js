import {createEvent, createStore} from "effector";

const getRandowW = () => [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
].map(() => (Math.random() / 10.))

export const getS = (Xs, Ws) =>
    Xs
        .reduce(
            (result, x, index) => result + x * Ws[index],
            0
        )

const Aw = [
    {
        x: [
            1, 0, 0, 0, 1,
            0, 1, 0, 1, 0,
            0, 1, 1, 1, 0,
            0, 1, 0, 1, 0,
            1, 0, 0, 0, 1,
        ],
        t: [1, 0],
        S: [],
        diff: 0
    },
    {
        x: [
            0, 0, 1, 0, 0,
            0, 1, 0, 1, 0,
            1, 0, 0, 0, 1,
            1, 1, 1, 1, 1,
            1, 0, 0, 0, 1,
        ],
        t: [0, 1],
        S: [],
        diff: 0
    },
].map(({x}) => x)
export const getA = (xs) => xs.map((x, indexNewA) => {
    const indexAw = Math.trunc(indexNewA / 13);

    const S = getS(xs, Aw[indexAw])
    return S > 6 ? 1 : 0

})

export const zeroWeight = [1, 2].map(getRandowW)
export const $weight = createStore(zeroWeight)

export const setWeights = createEvent()
