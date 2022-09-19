import {
    $recognize,
    recognizeFunctions,
    setRecognize
} from "./index";


$recognize
    .on(setRecognize, (_, recognizeId) => recognizeFunctions.find(({id}) => recognizeId === id))
