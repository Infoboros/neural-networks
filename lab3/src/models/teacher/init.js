import {
    $teacher,
    changeTeacher, getS,
    teachEvent,
} from './index'
import {setWeights} from "../weight";
import {setSs} from "../presets";
import {setCountOperations} from "../info";

const handleChangeTeacher = (_, teacher) => teacher
const handleTeach = (teacher, {M, weight}) => {
    const teacherMs = M.map(({x, ...m}) => ({...m, x: [1, ...x]}))
    let W = weight.map(w => [...w])

    const teached = []

    let countOperations = 0;
    while (teached.length !== 5) {
        ++countOperations;
        teacherMs
            .forEach(
                m => {
                    W = W.map(
                        (wRow, indexWRow) => {
                            if (teached.includes(indexWRow))
                                return wRow


                            const newWRow = wRow
                                .map(
                                    (oldW, index) =>
                                        teacher.getNextWeight(
                                            oldW,
                                            teacher.learningRate,
                                            m.t[indexWRow],
                                            getS(m.x, wRow),
                                            m.x[index]
                                        )
                                )

                            const delta = newWRow.reduce(
                                (processedDelta, newW, indexW) => Math.abs(newW - wRow[indexW]) + processedDelta,
                                0.0
                            )
                            if (delta <= teacher.epsilon)
                                teached.push(indexWRow)

                            return newWRow
                        }
                    )
                }
            )
    }
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
