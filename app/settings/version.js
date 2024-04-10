import { Stack, Typography } from '@mui/material';

export default function Version (props) {
    const version = process.env.REACT_APP_VERSION;

    return(
        <Stack width={'100%'} direction={'column'} spacing={1} alignItems={'center'} >
            <Typography variant='caption'>v{version}</Typography>
        </Stack>
    );
}