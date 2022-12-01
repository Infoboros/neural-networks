import {attach, combine, createEffect, createEvent, createStore} from "effector";
import {$M} from '../presets'
import {$weight} from "../weight";
import {$recognize} from "../recognize";

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

export const kohTeacher = ({
    id: 1,
    name: 'Сеть Кохонена',
    epsilon: 0.05,
    alfa: 0.6,
    k: 0.75
})

export const teachers = [kohTeacher]

export const $teacher = createStore(kohTeacher)

export const changeTeacher = createEvent()

export const teachEvent = createEvent()
export const teachFx = createEffect(teachEvent)
export const teach = attach({
    effect: teachFx,
    source: combine(
        $M, $weight, $recognize,
        (M, weight, recognize) => ({M, weight, recognize})
    ),
    mapParams: (_, data) => (data)
})
