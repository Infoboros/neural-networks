import React from "react";
import {Button, MenuItem, Select, TextField, Typography} from "@mui/material";
import {$teacher, changeTeacher, teach, teachers} from "../../models/teacher";
import {useStore} from "effector-react";
import {makeStyles} from "@mui/styles";
import {$info} from "../../models/info";

const useStyles = makeStyles(() => ({
    wrapper: {
        marginBottom: '32px',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
}))

export default function Teacher() {
    const classes = useStyles()

    const teacher = useStore($teacher)
    const {countOperations} = useStore($info)

    return (
        <div className={classes.wrapper}>
            <Select
                value={teacher.id}
                onChange={
                    ({target}) =>
                        changeTeacher(
                            teachers.find(({id}) => id === target.value)
                        )
                }
            >
                {
                    teachers.map(({id, name}) => (
                        <MenuItem
                            value={id}
                            key={id}
                        >
                            {name}
                        </MenuItem>
                    ))
                }
            </Select>
            <TextField
                style={{marginTop: '16px'}}
                label={'Эпсилон'}

                value={teacher.epsilon}
                onChange={
                    ({target}) =>
                        changeTeacher(
                            {
                                ...teacher,
                                epsilon: target.value
                            }
                        )
                }

                type={'number'}
            />
            <Typography textAlign={'center'} style={{marginTop: 8}}>
                Количество итераций при прохождении слоя MaxNet:
                <br/>
                {countOperations || 'Пока не обучалось'}
            </Typography>
            <Button
                style={{marginTop: '16px'}}
                variant={'contained'}
                onClick={teach}
            >
                Инициализировать веса
            </Button>
        </div>
    )
}
