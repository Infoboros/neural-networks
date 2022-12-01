import {getS} from "../teacher";
import {createEvent, createStore} from "effector";
import {setCountOperations} from "../info";

export function average(nums) {
    return nums.reduce((a, b) => (a + b)) / nums.length;
}

export function equalArray(a, b){
    return JSON.stringify(a) === JSON.stringify(b)
}

export const recognizeFunctions = [
    {
        recognize: (xs, ws) => ws.map(
            weigh => getS(xs, weigh)
        ),
        id: 1,
        name: 'Сеть Кохонена'
    },

]

export const $recognize = createStore(recognizeFunctions[0])

export const setRecognize = createEvent()
