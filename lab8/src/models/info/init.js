import {
    $info,
    setCountOperations
} from './index'

const handleSetCountOperations = (state, count) => ({
    ...state,
    countOperations: count
})

$info
    .on(setCountOperations, handleSetCountOperations)
