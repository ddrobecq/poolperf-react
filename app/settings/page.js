import { Stack } from '@mui/material';
import Version from './version';

export default function Settings (props) {
    //get the version from the package.json
    const version = require('../../package.json').version;

    return(
        <Stack direction={'row'} spacing={1} alignContent={'center'} >
            <Version />
        </Stack>
    );
}