'use client';

import Image from 'next/image';
import { AppBar, Divider, Stack } from '@mui/material';

export default function Header (props) {
    return (
        <AppBar position={'sticky'} sx={{ marginBottom: 1}}>
            <Stack width={'100%'} spacing={1} direction={'column'} alignItems={'center'} >
                <Image src={'/header.png'} alt={'title'} width={250} height={50}/>
            </Stack>
        </AppBar>
    );
}