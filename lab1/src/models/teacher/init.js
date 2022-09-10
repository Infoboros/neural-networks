import {
    $teacher,
    changeTeacher, getS,
    teachEvent,
} from './index'
import {setWeights} from "../weight";
import {setSs} from "../presets";

const handleChangeTeacher = (_, teacher) => teacher

const handleTeach = (teacher, {M, weight}) => {
    const teacherMs = M.map(m => ({t: m.t[teacher.fieldY], x: [1, ...m.x]}))
    let W = weight.map(() => 0)

    const checkNotEnd = () => teacherMs
        .some(
            m => teacher.activation(m.x, W) !== m.t
        )

    while (checkNotEnd()) {
        teacherMs
            .forEach(
                m => {
                    W = W.map((oldW, index) => teacher.getNextWeight(oldW, m.x[index], m.t, teacher.learningRate))
                }
            )
    }

    setWeights(W)
    setSs(
        teacherMs.map(
            m => getS(m.x, W)
        )
    )
}

$teacher
    .on(changeTeacher, handleChangeTeacher)
    .on(teachEvent, handleTeach)
