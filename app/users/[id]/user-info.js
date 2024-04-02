import Loader from "@/app/lib/loader";
import { Skeleton, Stack, Typography } from "@mui/material";
import useFetch from "@/app/lib/fetchAPI";
import UserAvatar from "./user-avatar";

export default function UserInfo (props) {
    const id = (props.id) ? props.id : 0;
    const [data, isLoading] = useFetch (`/users/${id}`, "GET", null);

    return (
        <Stack direction={"column"} >
            <Stack direction={props.direction} alignItems={'center'} spacing={4} >
                {(id === 0)
                ?   <>
                        <UserAvatar id={0} />
                        <Typography align='center' variant={"h1"}>Nouveau joueur</Typography>
                    </>
                :   <>
                        <UserAvatar id={props.id} />
                        <Typography align='center' variant={"h1"}>
                            {(data && data.length>0) ? data[0].usr_name : <Skeleton variant="h1" />}
                        </Typography>
                    </>
                }
            </Stack>
        </Stack>
);
}
