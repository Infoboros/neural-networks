import React from "react";
import {useStore} from "effector-react";
import {$input, handleInput} from "../../models/input";
import Map from "../Map";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles(() => ({
    wrapper: {
        padding: '0 32px',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}))

export default function InputView() {

    const classes = useStyles()

    const input = useStore($input)
    return (
        <div className={classes.wrapper}>
            <Map
                x={input}
                width={'256px'}
                handleClickCell={handleInput}
            />
        </div>
    )
}
