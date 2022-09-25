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
                ? !cell
                : cell
    )

$input
    .on(setInput, handleSetInput)
    .on(handleInput, handleHandleInput);
