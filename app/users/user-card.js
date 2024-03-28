'use client';

import { Card, CardActionArea, CardActions, CardContent, IconButton, Link, Stack } from "@mui/material";
import UserInfo from "./[id]/user-info";
import EditIcon from '@mui/icons-material/Edit';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useRouter } from "next/navigation";
import Camera from "../lib/camera";

export default function UserCard (props) {
    const router = useRouter();

    function handleSelect() {
        if (props.handleSelect) {
            props.handleSelect(props.id);
        } else {
            router.replace(`/users/${props.id}`);
        }
    }

    return (
        <Card >
            <Stack direction={"row"} >
                {(props.actions) && <CardActions>
                    <Stack direction={'column'} >
                        <IconButton aria-label="edit" size="large" >
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="change-avatar" size="large" >
                            <CameraAltIcon />
                        </IconButton>
                    </Stack>
                </CardActions>}
                    <CardActionArea onClick={handleSelect} >
                        <CardContent>
                            <UserInfo id={props.id} direction={'row'} />
                        </CardContent>
                    </CardActionArea>
            </Stack>
        </Card>
    );
}