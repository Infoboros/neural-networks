import React from "react";
import {List, Typography} from "@mui/material";
import Map from "../Map";
import {$M} from "../../models/presets";
import {useStore} from "effector-react";
import {setInput} from "../../models/input";

export default function PresetList() {

    const M = useStore($M)

    return (
        <List
            style={{
                height: '100%',
                overflowY: 'scroll',
                padding: 0
            }}
        >
            {
                M.map(
                    ({x, t, S, diff}, index) => (
                        <div
                            style={{
                                border: '1px solid',
                                borderRadius: '8px',
                                padding: '16px 0'
                            }}
                            onClick={() => setInput(x)}
                        >
                            <Typography style={{width: '100%', textAlign: 'center', marginBottom: '8px'}}>
                                Ожидаемый <br/>
                                результат: <br/>
                                {
                                    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                                        .map((_, indexT) => indexT === index ? '1' : '0')
                                        .join(', ')
                                }
                            </Typography>
                            <Typography style={{width: '100%', textAlign: 'center', marginBottom: '8px'}}>
                                Y: {S.map(s => s.toFixed(1)).join(', ')}
                            </Typography>
                            <Typography style={{width: '100%', textAlign: 'center', marginBottom: '8px'}}>
                                Мера сходства: {diff}
                            </Typography>
                            <Map
                                width={'32px'}
                                x={x}
                                key={index}
                            />
                        </div>
                    )
                )
            }
        </List>
    )
}
