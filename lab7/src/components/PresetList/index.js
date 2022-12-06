import React from "react";
import {List, Typography} from "@mui/material";
import Map from "../Map";
import {$M} from "../../models/presets";
import {useStore} from "effector-react";
import {setInput} from "../../models/input";
import {getDiff} from "../../models/teacher";

export default function PresetList() {

    const M = useStore($M)
    const getDiffs = () => {
        const clusters = M.map(({S}) => S.findIndex((item) => item === Math.max(...S)))
        const setClusters = Array.from(new Set(clusters))
        const diffs = M.map(
            ({x: x1}) =>
                M.map(({x: x2}) => getDiff(x1, x2))
        )

        return setClusters.reduce(
            (result, cluster) => {
                const maxDiff = Math.max(
                    ...diffs.filter((val, index) => (clusters[index] === cluster) && val)
                        .map(
                            row => Math.max(...row.filter((val, index) => (clusters[index] === cluster) && val))
                        ))
                const minDiff =Math.min(
                    ...diffs.filter((val, index) => (clusters[index] === cluster) && val)
                        .map(
                            row =>
                                Math.min(...row.filter((val, index) => (clusters[index] === cluster) && val))
                        ))
                const size = clusters.reduce((result, c) => c === cluster ? result + 1 : result, 0)
                return [
                    ...result,
                    {
                        name: cluster,
                        maxDiff,
                        minDiff,
                        size
                    }
                ]
            },
            [])

    }

    const diffs = getDiffs()
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
                                A: {S.findIndex((item) => item === Math.max(...S))}
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
            {
                diffs.map(({
                    name,
                    maxDiff,
                    minDiff,
                    size
                }) => (
                    <div>
                        <p>Кластер {name}</p>
                        <p>Максимальная разница {maxDiff}</p>
                        <p>Минимальная разница {minDiff}</p>
                        <p>Размер {size}</p>
                        <br/>
                    </div>
                ))
            }
        </List>
    )
}
