import { Skeleton, Stack, Typography } from "@mui/material";
import useFetch from "@/app/lib/fetchAPI";
import UserAvatar from "./user-avatar";
import { _DEBUG } from "@/app/lib/tools";

export default function UserInfo (props) {
    const id = (props.id) ? props.id : 0;
    const [data, isLoading] = useFetch (`/users/${id}`, "GET", null);
    const spacing = (props.direction === 'row') ? 4 : 1;

    return (
        <Stack direction={"column"} >
            <Stack direction={props.direction} alignItems={'center'} spacing={spacing} >
                {(id === 0) // New player
                ?   <>
                        <UserAvatar id={0} />
                        <Typography align='center' variant={"h1"}>Nouveau joueur</Typography>
                    </>
                :   <>
                        <UserAvatar id={props.id} />
                        <Typography align='center' variant={"h1"}>
                            {(data && data.length>0) ? data[0].usr_name : <Skeleton variant="h1" width={100} />}
                        </Typography>
                    </>
                }
            </Stack>
        </Stack>
);
}
