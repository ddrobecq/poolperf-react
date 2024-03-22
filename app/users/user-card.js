'use client';

import { Card } from "@mui/material";
import UserInfo from "./[id]/user-info";

export default function UserCard (props) {
    return (
        <Card>
            <UserInfo id={props.id} size={'large'} />
        </Card>
    );
}