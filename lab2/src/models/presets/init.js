import {
    $M,
    setSs
} from "./index";

const handleSetSs = (M, Ss) =>
    M.map(
        (m, index) => ({...m, S: Ss[index]})
    )

$M
    .on(setSs, handleSetSs)
