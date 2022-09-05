import React from "react";
import {Button, MenuItem, Select} from "@mui/material";
import {$teacher, changeTeacher, teach, teachers} from "../../models/teacher";
import {useStore} from "effector-react";
import {makeStyles} from "@mui/styles";

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
            <Button
                style={{marginTop: '16px'}}
                variant={'contained'}
                onClick={teach}
            >
                Обучить
            </Button>
        </div>
    )
}
