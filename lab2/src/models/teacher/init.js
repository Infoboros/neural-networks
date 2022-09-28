import {
    $teacher,
    changeTeacher, getS,
    teachEvent,
} from './index'
import {setWeights} from "../weight";
import {setSs} from "../presets";
import {setCountOperations} from "../info";
import {average} from "../recognize";

const handleChangeTeacher = (_, teacher) => teacher

const equalArray = (a, b) => {
    if (a.length !== b.length)
        return false

    let equal = true;
    a.forEach((itemA, indexB) => {
        if (itemA !== b[indexB])
            equal = false
    })

    return equal
}

const handleTeach = (teacher, {M, weight}) => {
    const teacherMs = M.map(({x, ...m}) => ({...m, x: [1, ...x]}))
    let W = weight.map(weightRow => weightRow.map(() => 0))

    const checkNotEnd = () => W
        .some(
            (w, indexW) => {
                const Ss = teacherMs.map(m => getS(m.x, w))
                const {
                    Sone, Sother
                } = Ss.reduce(
                    (result, s, index) => teacherMs[index].t[indexW]
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
                return teacherMs.some(
                    (m, indexM) => {
                        const a = teacher.activation(m.x, w, average([Sone, Sother / 4]))
                        const a1 = m.t[indexW]
                        const t = teacher.activation(m.x, w, average([Sone, Sother / 4])) !== m.t[indexW]
                        return t
                    }
                )
            }
        )

    let countOperations = 0;
    while (checkNotEnd()) {
        ++countOperations;
        teacherMs
            .forEach(
                m => {
                    W = W.map(
                        (wRow, indexWRow) =>
                            wRow
                                .map(
                                    (oldW, index) =>
                                        teacher.getNextWeight(
                                            oldW,
                                            m.x[index],
                                            m.t[indexWRow],
                                            teacher.learningRate
                                        )
                                )
                    )
                }
            )
    }
    console.log(teacher)
    setWeights(W)
    setSs(
        teacherMs
            .map(
                m => W.map(w => getS(m.x, w))
            )
    )
    setCountOperations(countOperations)
}

$teacher
    .on(changeTeacher, handleChangeTeacher)
    .on(teachEvent, handleTeach)
