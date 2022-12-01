import {
    $weight,
    setWeights
} from "./index";


const handleSetWeights = (_, weights) => weights

$weight
    .on(setWeights, handleSetWeights)
