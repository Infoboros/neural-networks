import {
    $teacher,
    changeTeacher, getLast, getS,
    teachEvent,
} from './index'
import {setWeights} from "../weight";
import {setSs} from "../presets";
import {setCountOperations} from "../info";

const handleChangeTeacher = (_, teacher) => teacher
const handleTeach = (teacher, {M, weight}) => {
    const teacherMs = M

    let lastLearnData = [{}]
    let W = weight

    const teached = []

    let countOperations = 0;
    while ((countOperations <= 10000) && (teached.length !== 1)) {
        ++countOperations;

        teacherMs.forEach(
            ({x: xs, t: ts}, indexM) => {
                if (teached.includes(indexM))
                    return
                lastLearnData[indexM] = teacher.getNextWeights(ts, xs, W, teacher.learningRate)
                W = lastLearnData[indexM].newWeights
            }
        )

        teacherMs.forEach(
            ({t}, index) => {
                const epsilon = getLast(lastLearnData[index].directPropagation).reduce((res, Out, indexT) => res + Math.abs(Out-t[indexT]), 0)
                if ((epsilon) < teacher.epsilon)
                    teached.push(index)
            }
        )


    }
    setWeights(W)
    setSs(
        lastLearnData.map(forImage => getLast(forImage.directPropagation))
    )
    setCountOperations(countOperations)
}

$teacher
    .on(changeTeacher, handleChangeTeacher)
    .on(teachEvent, handleTeach)
