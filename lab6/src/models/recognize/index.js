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
        recognize: (xs, ws, epsilon) => {
            const Z = ws.map(w => getS(xs, w))

            let t = Z.map(z => z / 25)
            let tNext = []
            let count = 0
            while (true){
                count++;
                tNext = t.map(
                    (Ui, i) => {
                        const sum = epsilon * t.reduce((sum, Uj, j) => sum + (i === j ? 0 : Uj), 0)
                        const Uin = Ui - sum
                        return Uin > 0 ? Uin : 0
                    }
                )

                if (equalArray(t, tNext))
                    break;
                else
                    t = [...tNext]
            }

            setCountOperations(count)
            return {
                Z,
                Y: tNext
            }
        },
        id: 1,
        name: 'Сеть Хемминга'
    },

]

export const $recognize = createStore(recognizeFunctions[0])

export const setRecognize = createEvent()
