'use client';

import Image from 'next/image';
import { AppBar, Stack } from '@mui/material';
import { useTheme } from '@emotion/react';

export default function Header (props) {
    const theme = useTheme();

    return (
        <AppBar position={'sticky'} sx={{ marginBottom: 1, backgroundImage:'none', backgroundColor: theme.palette.background.default}}>
            <Stack width={'100%'} spacing={1} direction={'column'} alignItems={'center'} >
                <Image src={'/header.png'} alt={'title'} width={250} height={50}/>
            </Stack>
        </AppBar>
    );
}