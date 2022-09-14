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
    const teacherMs = M.map(m => ({t: m.t[teacher.fieldY], x: [1, ...m.x]}))
    let W = weight.map(() => 0)

    const checkNotEnd = () => teacherMs
        .some(
            m => teacher.activation(m.x, W) !== m.t
        )

    let countOperations = 0;
    while (checkNotEnd()) {
        ++countOperations;
        teacherMs
            .forEach(
                m => {
                    W = W.map((oldW, index) => teacher.getNextWeight(oldW, m.x[index], m.t, teacher.learningRate))
                }
            )
    }
    console.log(teacher)
    setWeights(W)
    setSs(
        teacherMs.map(
            m => getS(m.x, W)
        )
    )
    setCountOperations(countOperations)
}

$teacher
    .on(changeTeacher, handleChangeTeacher)
    .on(teachEvent, handleTeach)
