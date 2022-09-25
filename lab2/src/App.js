import {Paper} from "@mui/material";
import {makeStyles} from '@mui/styles'
import PresetList from "./components/PresetList";
import InputView from "./components/InputView";
import Controls from "./components/Controls";

const useStyles = makeStyles(() => ({
    wrapper: {
        display: 'flex',
        justifyContent: 'space-between',

        width: '90%',
        height: '90%',
    },
    root: {
        display: 'flex',

        justifyContent: 'center',
        alignItems: 'center',

        height: '100%',
        width: '100%'
    },

    presetListWrapper: {
        width: '20%',
    },
    inputViewWrapper: {
        width: '40%'
    },
    controlsWrapper: {
        width: '40%'
    }
}))

function App() {

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Paper className={classes.wrapper}>
                <div className={classes.presetListWrapper}>
                    <PresetList/>
                </div>
                <InputView/>
                <Controls/>
            </Paper>
        </div>
    );
}

export default App;
