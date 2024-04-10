import { Divider, Stack } from '@mui/material';
import Version from './version';
import SettingsTheme from './settings-theme';
import SleepMode from './settings-sleep';

export default function Settings (props) {
    return(
        <Stack direction={'column'} spacing={2} alignContent={'center'} >
            <Version />
            <Divider orientation={'horizontal'} />
            <SettingsTheme />
            <Divider />
            <SleepMode />
        </Stack>
    );
}