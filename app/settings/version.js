import { Stack, Typography } from '@mui/material';

export default function Version (props) {
    const version = process.env.REACT_APP_VERSION;

    return(
        <Stack direction={'column'} spacing={1} alignContent={'center'} >
            <Typography variant='caption'>Pool Perf v{version}</Typography>
        </Stack>
    );
}