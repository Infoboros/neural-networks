import React, {useEffect, useState} from "react";
import {Button, Typography} from "@mui/material";
import {$teacher} from "../../models/teacher";
import {useStore} from "effector-react";
import {makeStyles} from "@mui/styles";
import {$weight} from "../../models/weight";
import {$input} from "../../models/input";
import {$M} from "../../models/presets";

const useStyles = makeStyles(() => ({
    wrapper: {
        margin: '32px 0',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
}))

function average(nums) {
    return nums.reduce((a, b) => (a + b)) / nums.length;
}

export default function Result() {
    const classes = useStyles()

    const map = useStore($input)
    const teacher = useStore($teacher)
    const weights = useStore($weight)
    const M = useStore($M)

    const [result, setResult] = useState(null)
    useEffect(() => {
        setResult(null)
    }, [teacher])

    const handleRecognize = () => {
        const firstType = M.filter(({t}) => t.bin === 1).map(({S}) => S)
        const secondType = M.filter(({t}) => t.bin === 0).map(({S}) => S)

        const S = average([average(firstType), average(secondType)])

        setResult(
            teacher
                .activation([1, ...map], weights, S)
        )
    }

    return (
        <div className={classes.wrapper}>
            <Typography variant={'h5'}>
                {
                    result
                        ? `Результат: ${result}`
                        : 'Сначала посчитай!'
                }
            </Typography>
            <Button
                style={{marginTop: '16px'}}
                variant={'contained'}
                onClick={handleRecognize}
            >
                Распознать
            </Button>
        </div>
    )
}
