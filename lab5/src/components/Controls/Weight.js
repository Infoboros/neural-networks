import React from 'react';
import {useStore} from "effector-react";
import {$weight} from "../../models/weight";
import {makeStyles} from "@mui/styles";
import {Typography} from "@mui/material";

const useStyles = makeStyles(() => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    td: {
        width: '32px',
        height: '32px'
    }
}))

export default function Weight() {
    const classes = useStyles()

    const indexsY = [
        [0],
        [0],
        [0]
    ];
    const indexsX = [
        [0, 1],
        [0, 1],
        [0, 1]
    ]

    const weight = useStore($weight)

    return (
        <div className={classes.wrapper}>
            <Typography variant={"h5"}>
                Веса
            </Typography>
            {
                weight.map(
                    (mws, indexMws) => (
                        <React.Fragment>
                            <Typography> Слой {indexMws}</Typography>
                            {mws.map(
                                currentWeight => (
                                    <table style={{marginBottom: '16px'}}>

                                        <tr>
                                            {
                                                currentWeight.map(
                                                    w => {
                                                        return (<td className={classes.td}>
                                                            {w.toFixed(4)}
                                                        </td>)
                                                    }
                                                )
                                            }
                                        </tr>

                                    </table>
                                )
                            )}
                        </React.Fragment>
                    )
                )
            }
        </div>
    )
}
