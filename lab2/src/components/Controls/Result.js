import React, {useEffect, useState} from "react";
import {Button, MenuItem, Select, Typography} from "@mui/material";
import {$teacher, getDiff, getS} from "../../models/teacher";
import {useStore} from "effector-react";
import {makeStyles} from "@mui/styles";
import {$weight} from "../../models/weight";
import {$input} from "../../models/input";
import {$M, setDiffs} from "../../models/presets";
import {$recognize, recognizeFunctions, setRecognize} from "../../models/recognize";

const useStyles = makeStyles(() => ({
    wrapper: {
        margin: '32px 0',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
}))

export default function Result() {
    const classes = useStyles()

    const map = useStore($input)
    const teacher = useStore($teacher)
    const weights = useStore($weight)
    const M = useStore($M)
    const recognize = useStore($recognize);

    const [result, setResult] = useState(null)
    const [S, setS] = useState(null)
    const [frontierS, setFrontierS] = useState(null)

    useEffect(() => {
        setResult(null)
        setS(null)
        setFrontierS(null)
    }, [teacher])

    const handleRecognize = () => {
        const Sfrontiers = weights.map((w, indexW) => {
            const Ss = M.map(m => getS([1, ...m.x], w))
            const {
                Sone, Sother
            } = Ss.reduce(
                (result, s, index) => M[index].t[indexW]
                    ? ({
                        ...result,
                        Sone: result.Sone + s,
                    })
                    : ({
                        ...result,
                        Sother: result.Sother + s,
                    }),
                {Sone: 0, Sother: 0}
            )
            return recognize.getFrontier(Sone, Sother / 4.)
        })

        setFrontierS(Sfrontiers)
        setResult(
            weights.map(
                (w, index) => recognize.recognize([1, ...map], w, Sfrontiers[index], Sfrontiers[index])
            )
        )
        setS(
            weights.map(
                w => getS([1, ...map], w)
            )
        )
        setDiffs(
            M
                .map(
                    ({x}) => getDiff(x, map)
                )
        )
    }

    return (
        <div className={classes.wrapper}>
            <Typography variant={'h5'}>
                {
                    (result)
                        ? `??????????????????: ${result}`
                        : '?????????????? ????????????????!'
                }
            </Typography>
            <Typography variant={'h5'}>
                {
                    (result)
                        ? `S: ${S}`
                        : '?????????????? ????????????????!'
                }
            </Typography>
            <Typography variant={'h5'}>
                {
                    (result)
                        ? `?????????????????? S: ${frontierS}`
                        : '?????????????? ????????????????!'
                }
            </Typography>
            <Select
                style={{marginTop: '8px'}}
                value={recognize.id}
                onChange={
                    ({target}) =>
                        setRecognize(
                            target.value
                        )
                }
            >
                {
                    recognizeFunctions.map(({id, name}) => (
                        <MenuItem
                            value={id}
                            key={id}
                        >
                            {name}
                        </MenuItem>
                    ))
                }
            </Select>
            <Button
                style={{marginTop: '8px'}}
                variant={'contained'}
                onClick={handleRecognize}
            >
                ????????????????????
            </Button>
        </div>
    )
}
