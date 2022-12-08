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

    const indexsY = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const indexsX = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    const weight = useStore($weight)

    return (
        <div className={classes.wrapper}>
            <Typography variant={"h5"}>
                Веса Z
            </Typography>
            {
                weight.map(
                    currentWeight => (
                        <table style={{marginBottom: '16px'}}>
                            {
                                indexsY
                                    .map(
                                        indexY => (
                                            <tr>
                                                {
                                                    indexsX.map(
                                                        indexX => {
                                                            return (
                                                                <td className={classes.td}>
                                                                    {currentWeight[indexY * indexsX.length + indexX].toFixed(4)}
                                                                </td>
                                                            )
                                                        }
                                                    )
                                                }
                                            </tr>
                                        )
                                    )}
                        </table>
                    )
                )
            }
        </div>
    )
}
