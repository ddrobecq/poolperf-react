'use client';

import { Card, CardActionArea, CardActions, CardContent, IconButton, Link, Stack } from "@mui/material";
import UserInfo from "./[id]/user-info";
import EditIcon from '@mui/icons-material/Edit';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export default function UserCard (props) {
    return (
        <Card >
            <Stack direction={"row"} >
                <CardActions>
                    <Stack direction={'column'} >
                        <IconButton aria-label="edit" size="large" >
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="change-avatar" size="large" >
                            <AccountBoxIcon />
                        </IconButton>
                    </Stack>
                </CardActions>
                <Link href={`/users/${props.id}`} >
                    <CardActionArea >
                        <CardContent>
                            <UserInfo id={props.id} size={'large'} />
                        </CardContent>
                    </CardActionArea>
                </Link>
            </Stack>
        </Card>
    );
}