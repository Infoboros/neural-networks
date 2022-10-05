import {attach, combine, createEffect, createEvent, createStore} from "effector";
import {$M} from '../presets'
import {$weight} from "../weight";

export const getS = (Xs, Ws) =>
    Xs
        .reduce(
            (result, x, index) => result + x * Ws[index],
            0
        )

export const getDiff = (A, B) => A.reduce(
    (res, a, indexB) => {
        if (a !== B[indexB])
            return res + 1;
        return res;
    },
    0
)

export const bipolarTeacher = ({
    id: 1,
    getNextWeight: (old, x, y, k = 1.0) => old + (x || -1) * y * k,
    activation: (xs, w, S = 0) =>
        getS(xs, w) > S
            ? 1
            : -1,
    fieldY: 'bipolar',
    name: 'Биполярный',
    learningRate: 1.0
})

export const binTeacher = ({
    id: 2,
    getNextWeight: (old, x, y, k = 1.0) => {
        let delta = 0;
        if ((x === 1) && (y === 1))
            delta = 1;
        if ((x !== 0) && (y === 0))
            delta = -1;
        return old + delta * k;
    },
    activation: (xs, w, S = 0) =>
        getS(xs, w) > S
            ? 1
            : 0,
    fieldY: 'bin',
    name: 'Бинарный',
    learningRate: 1.0
})

export const teachers = [bipolarTeacher, binTeacher]

export const $teacher = createStore(binTeacher)

export const changeTeacher = createEvent()

export const teachEvent = createEvent()
export const teachFx = createEffect(teachEvent)
export const teach = attach({
    effect: teachFx,
    source: combine(
        $M, $weight,
        (M, weight) => ({M, weight})
    ),
    mapParams: (_, data) => (data)
})
