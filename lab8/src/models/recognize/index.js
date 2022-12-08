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
        recognize: (xs, ws) => {

            let prevY = [...xs];
            let nextY = [...xs];

            let countOperations = 0;

            const checkEpsilon = (prevW, nextW) => {
                return prevW.reduce(
                    (result, prevWr, indexR) =>
                        result || (Math.abs(prevWr - nextW[indexR]) > 1e-10),
                    false
                )
            }

            do {
                countOperations++
                prevY = [...nextY]
                nextY = ws.map((w, t) =>{
                        const S = getS(prevY, w)
                        if (S > 0) return 1
                        if ((Math.abs(S) < 1e-10)) return prevY[t]
                        if (S < 0) return  -1
                    }
                )


            } while (checkEpsilon(prevY, nextY))
            setCountOperations(countOperations)
            return nextY
        },
        id: 1,
        name: 'Сеть Хопфилда'
    },

]

export const $recognize = createStore(recognizeFunctions[0])

export const setRecognize = createEvent()
