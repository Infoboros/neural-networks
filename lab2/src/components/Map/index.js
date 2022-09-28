import React from "react";
import {makeStyles} from "@mui/styles";


const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    notMarkCell: {
    },
    markCell: {
        backgroundColor: theme.palette.primary.main
    },
    table: {
        borderCollapse: 'collapse'
    },
    td: {
        border: '1px solid'
    }
}))

export default function Map(props) {

    const {
        x,
        width,
        handleClickCell = () => {}
    } = props
    const classes = useStyles()

    const yIndexes = [0, 1, 2, 3, 4]
    const xIndexes = [0, 1, 2, 3, 4]

    return (
        <div className={classes.wrapper}>
            <table className={classes.table}>
                {
                    yIndexes
                        .map(
                            yIndex => (
                                <tr>
                                {
                                    xIndexes
                                        .map(
                                            xIndex => {
                                                const cell = yIndex * (xIndexes.length) + xIndex
                                                return (
                                                    <td className={classes.td} onClick={() => handleClickCell(cell)}>
                                                        <div
                                                            style={{
                                                                width,
                                                                height: width
                                                            }}
                                                            className={
                                                                x[cell]
                                                                    ? classes.markCell
                                                                    : classes.notMarkCell
                                                            }
                                                        />
                                                    </td>
                                                )
                                            }
                                        )
                                }
                                </tr>
                            )
                        )
                }
            </table>
        </div>
    )
}
