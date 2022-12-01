import {
    $teacher,
    changeTeacher, getS,
    teachEvent,
} from './index'
import {setWeights} from "../weight";
import {setSs} from "../presets";
import {setCountOperations} from "../info";

const handleChangeTeacher = (_, teacher) => teacher
const handleTeach = (teacher, {M, weight, recognize}) => {

    let prevW = weight.map(w => [...w]);
    let nextW = prevW;

    let alfa = teacher.alfa;
    let countOperations = 0;

    const checkEpsilon = (prevW, nextW) => {
        return prevW.reduce(
            (result, prevWr, indexR) =>
                result || prevWr.reduce(
                    (result, prevWre, indexE) => result || (Math.abs(prevWre - nextW[indexR][indexE]) > teacher.epsilon),
                    false
                ),
            false
        )
    }

    do {
        countOperations++
        prevW = nextW.map(w => [...w])

        M.forEach(({x}) =>  {
            const {minI} = nextW.reduce(
                ({minI, ds}, w, index) => {
                    const d = w.reduce(
                        (d, wi, i) => d + Math.pow(wi - x[i], 2),
                        0
                    )
                    if (index === 0)
                        return ({
                            minI: 0,
                            ds: [d]
                        })
                    else
                        return ({
                            minI: ds[minI] < d ? minI : index,
                            ds: [...ds, d]
                        })
                },
                {minI: 0, ds: []}
            )

            nextW[minI] = nextW[minI].map(
                (wOld, i) => wOld + alfa * (x[i] - wOld)
            )

        })

        alfa *= teacher.k
    } while (checkEpsilon(prevW, nextW))

    setCountOperations(countOperations)
    setWeights(nextW)
    setSs(
        M
            .map(
                ({x}) => recognize.recognize(x, nextW)
            )
    )
}

$teacher
    .on(changeTeacher, handleChangeTeacher)
    .on(teachEvent, handleTeach)
