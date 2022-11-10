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
            {
                in: getNextLayerUout(getLast(propagation).out, mws),
                out: getNextLayerUout(getLast(propagation).out, mws, (Uin) => 1 / (1 + Math.exp(-Uin))),
            }
        ]
        ,
        [{
            in: xs,
            out: xs
        }]
    )
    return propagation
}

export const getErrorsBackPropagation = (ts, propagation, listMws) => {
    const reversedPropagation = [...propagation].reverse()
    const reversedListMws = [...listMws].reverse()

    return reversedPropagation.reduce(
        (errors, {out: Os}, index) => {
            if (index === (reversedPropagation.length-1))
                return errors
            const mws = reversedListMws[index]
            if (index === 0) {
                const error = Os.reduce(
                    (result, o, k) => [...result, o * (1 - o) * (ts[k] - o)],
                    []
                )
                const Oins = reversedPropagation[index+1].out.map((_, j) => error.reduce((sum, error, k) => sum + error * mws[k][j], 0))
                return [
                    {
                        error,
                        Oins
                    }
                ]
            } else {
                const {Oins} = getLast(errors)

                const error = Os.reduce(
                    (result, o, k) => [...result, o * (1 - o) * (Oins[k])],
                    []
                )
                const tmp = reversedPropagation[index+1].out.map((_, j) => j)
                const newOins =  reversedPropagation[index+1].out.map(
                    (_, j) => error.reduce(
                        (sum, error, k) => sum + error * mws[k][j], 0
                    )
                )
                return [
                    ...errors,
                    {
                        error,
                        Oins: newOins
                    }
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
                            (wOld, indexW) => wOld + nu * errors[indexL].error[indexM] * errors[indexL].Oins[indexW]
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
    learningRate: 0.3,
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
