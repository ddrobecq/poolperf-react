import { Skeleton, Stack, Typography } from "@mui/material";
import useFetch from "@/components/fetchAPI";
import UserAvatar from "./user-avatar";
import { _DEBUG } from "@/components/tools";

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
                        <UserName name={'Nouveau joueur'} />
                    </>
                :   <>
                        <UserAvatar id={props.id} />
                        <UserName name={data && data.length>0 ? data[0].usr_name : null} />
                    </>
                }
            </Stack>
        </Stack>
);
}

export function UserName (props) {
    return (
        <Typography align='center' variant={"h1"}>
            {(props.name) ? props.name : <Skeleton variant="h1" width={100} />}
        </Typography>
    );
}