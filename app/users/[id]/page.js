'use client';

import { Divider, IconButton, Link, Stack } from "@mui/material";
import UserInfo from "../components/user-info";
import UserDetailStats from "../components/user-stat";
import UserDetailGames from "../components/user-chart";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useState } from "react";
import useFetch from "@/components/fetchAPI";

export default function UserDetail({params}) {
    const id = params.id;
    const [dataStats, isLoadingStats] = useFetch (`/users/${id}/stats`, "GET", null);
    const [dataGames, isLoadingGames] = useFetch (`/users/${id}/games`, "GET", null);

    return (
        <Stack direction={"column"} spacing={2} alignItems={"center"} >
            <UserDetailInfo id={id} />
            <Divider />
            <UserDetailStats id={id} data={dataStats} />
            <Divider />
            <UserDetailGames id={id} dataGames={dataGames} dataStats={dataStats} />
        </Stack>
    );
}

function UserDetailInfo (props) {
    const [data, isLoading] = useFetch (`/users`, "GET", null);
    const [prevId, setPrevId] = useState(-1);
    const [nextId, setNextId] = useState(-1);

    useEffect(() => {
        if (data) {
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                if (element.usr_id == props.id) {
                    if (index > 0) setPrevId(data[index - 1].usr_id);
                    else setPrevId(data[data.length - 1].usr_id);
                    if (index < data.length - 1) setNextId(data[index + 1].usr_id);
                    else setNextId(data[0].usr_id);
                    break;
                }
            };
        }
    }, [data, props.id]);
  
    return (
        <Stack direction={"row"} spacing={2} alignItems={'center'} width={'100%'} justifyContent={'space-around'} >
            {(prevId>-1) && <Link href={`/users/${prevId}`} >
                <IconButton aria-label="prev" size="large" ><ArrowBackIosIcon/></IconButton>
            </Link>}
            <UserInfo id={props.id} direction={'column'} />
            {(nextId>-1) && <Link href={`/users/${nextId}`} >
                <IconButton aria-label="next" size="large" ><ArrowForwardIosIcon/></IconButton>
            </Link>}
        </Stack>
    );
}

