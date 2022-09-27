import React from "react";
import Weight from "./Weight";
import {makeStyles} from "@mui/styles";
import Teacher from "./Teacher";
import Result from "./Result";

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'auto',
        height: '100%'
    }
}))

export default function Controls(){

    const classes = useStyles()

    return (
        <div className={classes.root}>

            <Result/>
            <Teacher/>
            <Weight/>
        </div>
    )
}
