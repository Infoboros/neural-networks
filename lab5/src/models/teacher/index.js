import {attach, combine, createEffect, createEvent, createStore} from "effector";
import {$M} from '../presets'
import {$weight} from "../weight";

export const getLast = list => list[list.length - 1]

export const getS = (Xs, Ws) =>
    Xs
        .reduce(
            (result, x, index) => result + x * Ws[index],
            0
        )

export const getNextLayerUout = (xs, mws, activation = (Uin) => Uin) =>
    mws.reduce(
        (Uouts, ws) => {
            const Uin = getS(xs, ws)
            const Uout = activation(Uin);
            return [...Uouts, Uout]
        },
        []
    )

export const getDirectPropagation = (xs, listMws) => {
    const propagation = listMws.reduce(
        (propagation, mws) => [
            ...propagation,
            getNextLayerUout(getLast(propagation), mws, (Uin) => 1 / (1 + Math.exp(-Uin)))
        ]
        ,
        [xs]
    )
    return propagation
}

export const getErrorsBackPropagation = (ts, propagation, listMws) => {
    const reversedPropagation = [...propagation].reverse()
    const reversedListMws = [...listMws].reverse()

    return reversedPropagation.reduce(
        (errors, Os, index) => {
            if (index === (reversedPropagation.length-1))
                return errors
            const mws = reversedListMws[index-1]
            if (index === 0) {
                const error = Os.reduce(
                    (result, o, k) => [...result, o * (1 - o) * (ts[k] - o)],
                    []
                )
                return [
                        error
                ]
            } else {
                const Lerrors = getLast(errors)

                const error = Os.reduce(
                    (result, o, k) => [...result, o * (1 - o) * Lerrors.reduce((sum, err, l) => sum + err*mws[l][k], 0)],
                    []
                )

                return [
                    ...errors,
                    error
                ]
            }
        },
        []
    ).reverse()

}

const changeWeigths = (errors, listMws, propagation, nu) =>
    listMws.reduce(
        (newListMws, mws, indexL) =>
            [
                ...newListMws,
                mws.reduce(
                    (newMws, ws, indexM) => [
                        ...newMws,
                        ws.map(
                            (wOld, indexW) => wOld + nu * errors[indexL][indexM] * propagation[indexL+1][indexM]
                        )],
                    []
                )
            ],
        []
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
    getNextWeights: (ts, xs, listMws, nu) => {
        const directPropagation = getDirectPropagation(xs, listMws);
        const errors = getErrorsBackPropagation(ts, directPropagation, listMws)
        const newWeights = changeWeigths(errors, listMws, directPropagation, nu)
        return {
            directPropagation,
            errors,
            newWeights
        }
    },
    name: 'Обратное распространение ошибки',
    learningRate: 0.1,
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
