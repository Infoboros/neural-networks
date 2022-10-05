import {
    $M, setDiffs,
    setSs
} from "./index";

const handleSetSs = (M, Ss) =>
    M.map(
        (m, index) => ({...m, S: Ss[index]})
    )

const handleSetDiffs = (M, diffs) =>
    M.map(
        (m, index) => ({...m, diff: diffs[index]})
    )

$M
    .on(setSs, handleSetSs)
    .on(setDiffs, handleSetDiffs)
