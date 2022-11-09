import {createEvent, createStore} from "effector";
import {getS} from "../teacher";

export const recognizeFunctions = [
    {
        id: 1,
        recognize: (xs, mws) =>
            mws.reduce(
                (tmpR, ws) => getS(tmpR, ws),
                xs
            ),
        name: 'Распознавание'
    },

]

export const $recognize = createStore(recognizeFunctions[0])

export const setRecognize = createEvent()
