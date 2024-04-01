'use client';

import { Card, CardActionArea, CardActions, CardContent, IconButton, Link, Stack } from "@mui/material";
import UserInfo from "./[id]/user-info";
import { useRouter } from "next/navigation";
import UserForm from "./user-form";
import { _DEBUG } from "../lib/tools";
import { useState } from "react";

export default function UserCard (props) {
    const router = useRouter();
    const [openUpdate, setOpenUpdate] = useState(false);

    function onUpdate (status) {
        setOpenUpdate(false);
        if (status) {
            router.push(`/users`);
        }
    }

    function handleSelect() {
        if (props.handleSelect) {
            props.handleSelect(props.id);
        } else {
            setOpenUpdate(true);
        }
    }

    return (
        <Card >
            <Stack direction={"row"} >
                <CardActionArea onClick={handleSelect} >
                    <CardContent>
                        <UserInfo id={props.id} direction={'row'} />
                    </CardContent>
                </CardActionArea>
            </Stack>
            <UserForm id={props.id} name={props.name} open={openUpdate} onClose={onUpdate} />
        </Card>
    );
}