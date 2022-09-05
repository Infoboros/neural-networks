import {attach, combine, createEffect, createEvent, createStore} from "effector";
import {$M} from '../presets'
import {$weight} from "../weight";

export const bipolarTeacher = ({
    id: 1,
    getNextWeight: (old, x, y) => old + x * y,
    activation: (xs, ws, S = 0) =>
        xs
            .reduce(
                (result, x, index) => result + x * ws[index],
                0
            ) > 0
            ? 1
            : -1,
    fieldY: 'bipolar',
    name: 'Биполярный'
})

export const binTeacher = ({
    id: 2,
    getNextWeight: (old, x, y) => {
        let delta = 0;
        if ((x === 1) && (y === 1))
            delta = 1;
        if ((x !== 0) && (y === 0))
            delta = -1;
        return old + delta;
    },
    activation: (xs, ws, S = 0) =>
        xs
            .reduce(
                (result, x, index) => result + x * ws[index],
                0
            ) > 0
            ? 1
            : 0,
    fieldY: 'bin',
    name: 'Бинарный'
})

export const teachers = [bipolarTeacher, binTeacher]

export const $teacher = createStore(bipolarTeacher)

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
