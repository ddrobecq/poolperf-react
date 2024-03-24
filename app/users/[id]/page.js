'use client';

import { Divider, IconButton, Link, Stack } from "@mui/material";
import UserInfo from "./user-info";
import UserDetailStats from "./user-stat";
import UserDetailGames from "./user-chart";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useState } from "react";
import useFetch from "@/app/lib/fetchAPI";

export default function UserDetail({params}) {
    const id = params.id;
    const [data, isLoading] = useFetch (`/users`, "GET", null);
    const [prevId, setPrevId] = useState(-1);
    const [nextId, setNextId] = useState(-1);

    useEffect(() => {
        if (data) {
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                if (element.usr_id == id) {
                    if (index > 0) setPrevId(data[index - 1].usr_id);
                    else setPrevId(data[data.length - 1].usr_id);
                    if (index < data.length - 1) setNextId(data[index + 1].usr_id);
                    else setNextId(data[0].usr_id);
                    break;
                }
            };
        }
    }, [data, id]);

    return (
        <Stack direction={"column"} spacing={2} alignItems={"center"} >
            <Stack direction={"row"} spacing={2} alignItems={'center'} width={'100%'} justifyContent={'space-around'} >
                {(prevId>-1) && <Link href={`/users/${prevId}`} >
                    <IconButton aria-label="prev" size="large" ><ArrowBackIosIcon/></IconButton>
                </Link>}
                <UserInfo id={id} direction={'column'} />
                {(nextId>-1) && <Link href={`/users/${nextId}`} >
                    <IconButton aria-label="next" size="large" ><ArrowForwardIosIcon/></IconButton>
                </Link>}
            </Stack>
            <Divider />
            <UserDetailStats id={id} />
            <Divider />
            <UserDetailGames id={id} />
        </Stack>
    );
}

