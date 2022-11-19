import {
    $teacher,
    changeTeacher, getS,
    teachEvent,
} from './index'
import {setWeights} from "../weight";
import {setSs} from "../presets";

const handleChangeTeacher = (_, teacher) => teacher
const handleTeach = (teacher, {M, weight, recognize}) => {
    const W = weight.map(
        (w, indexM) =>
            w.map(
                (_, index) =>
                    (
                        index
                            ? M[indexM].x[index - 1]
                            : M[indexM].x.length
                    ) / 2
            )
    )

    setWeights(W)
    setSs(
        M
            .map(
                ({x}) => recognize.recognize([1, ...x], W, teacher.epsilon).Y
            )
    )
}

$teacher
    .on(changeTeacher, handleChangeTeacher)
    .on(teachEvent, handleTeach)
