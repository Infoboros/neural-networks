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
        [0, 1, 2, 3, 4],
        [0, 1, 2, 3],
        [0, 1, 2]
    ];
    const indexsX = [
        [-1, 0, 1, 2, 3, 4],
        [0, 1, 2, 3],
        [0, 1, 2]
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
                                        {
                                            indexsY[indexMws]
                                                .map(
                                                    indexY => (
                                                        <tr>
                                                            {
                                                                indexsX[indexMws].map(
                                                                    indexX => {
                                                                        if (indexX === -1) {
                                                                            if (indexY === 0)
                                                                                return <td
                                                                                    className={classes.td}>{currentWeight[0] && currentWeight[0].toFixed(4)}</td>
                                                                            return <td className={classes.td}/>
                                                                        }
                                                                        return (
                                                                            <td className={classes.td}>
                                                                                {currentWeight[indexY * (indexsX.length - 1) + indexX + 1] && currentWeight[indexY * (indexsX.length - 1) + indexX + 1].toFixed(4)}
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
                            )}
                        </React.Fragment>
                    )
                )
            }
        </div>
    )
}
