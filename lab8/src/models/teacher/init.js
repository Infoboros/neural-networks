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
    const Xs = M.map(({x}) => x);
    const newW = weight.map(
        (wRow, i) =>
            wRow.map(
                (_, j) => {
                    if (i === j)
                        return 0.0
                    else
                        return Xs.reduce(
                            (w, x) => w + x[i] * x[j],
                            0.0
                        )
                }
            )
    )
    setWeights(newW)
}

$teacher
    .on(changeTeacher, handleChangeTeacher)
    .on(teachEvent, handleTeach)
