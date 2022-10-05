import {
    $input,

    setInput,
    handleInput
} from './index'


const handleSetInput = (_, map) => map

const handleHandleInput = (state, value) =>
    state.map(
        (cell, index) =>
            index === value
                ? (cell === 1 ? 0 : 1)
                : cell
    )

$input
    .on(setInput, handleSetInput)
    .on(handleInput, handleHandleInput);
