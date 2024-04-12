import { Divider, Stack } from '@mui/material';
import Version from './version';
import SettingsTheme from './settings-theme';
import SleepMode from './settings-sleep';

export default function Settings (props) {
    return(
        <Stack direction={'column'} marginTop={5} spacing={1} alignContent={'center'} >
            <Version />
            <Divider />
            <SettingsTheme />
            <Divider />
            <SleepMode />
            <Divider />
        </Stack>
    );
}