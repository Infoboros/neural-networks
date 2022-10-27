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

export const gammaTeacher = ({
    id: 1,
    getNextWeight: (old, nu, a, index, delta) => {
        let deltaW = 0
        const Sa = Math.abs(delta)*nu
        if (a){
            if ((old >= 1) || (old <= 0))
                deltaW = 0
            else if ((old + nu) > 1)
                deltaW = 1 - old
            else if ((old - nu) < 0)
                deltaW = 0 - old
            else
                deltaW = nu - Sa / delta
        }
        else
            deltaW = - Sa/delta

        return old - deltaW
    },
    activation: (xs, w, S = 0) =>
        getS(xs, w) > S
            ? 1
            : 0,
    name: 'Гамма правило',
    nu: 0.01
})

export const teachers = [gammaTeacher]

export const $teacher = createStore(gammaTeacher)

export const changeTeacher = createEvent()
console.log($M)
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
