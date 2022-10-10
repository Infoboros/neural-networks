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

export const deltaTeacher = ({
    id: 1,
    getNextWeight: (old, a, Uout, Uin, x) => old + a*(Uout - Uin)*x,
    name: 'Дельта правило',
    learningRate: 0.11,
    epsilon: 0.05
})

export const teachers = [deltaTeacher]

export const $teacher = createStore(deltaTeacher)

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
