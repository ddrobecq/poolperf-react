'use client';

import { Divider, Stack } from "@mui/material";
import UserInfo from "./user-info";
import UserDetailStats from "./user-stat";
import UserDetailGames from "./user-chart";

export default function UserDetail({params}) {
    const id = params.id;

    return (
        <Stack direction={"column"} spacing={2} alignItems={"center"} >
            <UserInfo id={id} />
            <Divider />
            <UserDetailStats id={id} />
            <Divider />
            <UserDetailGames id={id} />
        </Stack>
    );
}

