import React, {useEffect, useState} from "react";
import {Button, MenuItem, Select, Typography} from "@mui/material";
import {$teacher, getDiff, getS} from "../../models/teacher";
import {useStore} from "effector-react";
import {makeStyles} from "@mui/styles";
import {$weight} from "../../models/weight";
import {$input} from "../../models/input";
import {$M, setDiffs} from "../../models/presets";
import {$recognize, average, recognizeFunctions, setRecognize} from "../../models/recognize";

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
        const S1 = average(M.filter(({t}) => t.bin === 1).map(({S}) => S))
        const S0 = average(M.filter(({t}) => t.bin === 0).map(({S}) => S))

        console.log(recognize)
        console.log(recognize.recognize([1, ...map], weights, S1, S0))

        setFrontierS(recognize.getFrontier(S1, S0))
        setResult(
            recognize.recognize([1, ...map], weights, S1, S0)
        )
        setS(getS([1, ...map], weights))
        console.log(M
            .map(
                ({x}) => getDiff(x, map)
            ))
        console.log(map)
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
                    (result <= 1)
                        ? `Результат: ${result}`
                        : 'Сначала посчитай!'
                }
            </Typography>
            <Typography variant={'h5'}>
                {
                    (result <= 1)
                        ? `S: ${S}`
                        : 'Сначала посчитай!'
                }
            </Typography>
            <Typography variant={'h5'}>
                {
                    (result <= 1)
                        ? `Пороговый S: ${frontierS}`
                        : 'Сначала посчитай!'
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
                Распознать
            </Button>
        </div>
    )
}
