import {$teacher, changeTeacher, getS, teachEvent,} from './index'
import {getA, setWeights} from "../weight";
import {setSs} from "../presets";
import {setCountOperations} from "../info";
import {average} from "../recognize";

const handleChangeTeacher = (_, teacher) => teacher
const handleTeach = (teacher, {M, weight}) => {
    let W = weight.map(w => [...w])

    const A = M.map(({x, ...m}, index) => {

            return ({
                ...m,
                x: getA(x)
            })
        }
    )

    const checkNotEnd = () => W
        .some(
            (w, indexW) => {
                const Ss = A.map(a => getS(a.x, w))
                const {
                    Sone, Sother
                } = Ss.reduce(
                    (result, s, index) => A[index].t[indexW]
                        ? ({
                            ...result,
                            Sone: result.Sone + s,
                        })
                        : ({
                            ...result,
                            Sother: result.Sother + s,
                        }),
                    {Sone: 0, Sother: 0}
                )
                return A.some(
                    (a, indexM) => {
                        const t = teacher.activation(a.x, w, average([Sone, Sother / 4])) !== a.t[indexW]
                        return t
                    }
                )
            }
        )

    let countOperations = 0;
    while (checkNotEnd()) {
        ++countOperations;
        A
            .forEach(
                a => {
                    W = W.map(
                        (wRow, indexWRow) => {
                            const Nak = a.x.filter(x => x === 1);
                            const Nagr = a.x.filter((x, indexW) => (x === 1) && (wRow[indexW] >= 1) && (wRow[indexW] <= 0));
                            const Nabgr = a.x.filter((x, indexW) => (x === 1) && (wRow[indexW] >= 0.999) && (wRow[indexW] <= 0.001))
                            const delta = Nak.length - Nagr.length - Nabgr.length

                            return wRow
                                .map(
                                    (oldW, index) => {
                                        const newW = teacher.getNextWeight(
                                            oldW,
                                            teacher.nu,
                                            a.x[index],
                                            index,
                                            delta
                                        )
                                        return newW
                                    }
                                )

                        }
                    )
                }
            )
    }
    setWeights(W)
    setSs(
        A
            .map(
                m => W.map(w => getS(m.x, w))
            )
    )
    setCountOperations(countOperations)
}

$teacher
    .on(changeTeacher, handleChangeTeacher)
    .on(teachEvent, handleTeach)
