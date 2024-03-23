import Loader from "@/app/lib/loader";
import { Stack, Typography } from "@mui/material";
import useFetch from "@/app/lib/fetchAPI";
import UserAvatar from "./user-avatar";

export default function UserInfo(props) {
    const [data, isLoading] = useFetch (`/users/${props.id}`, "GET", null);

    switch (props.size) {
        case 'large':
            return (
                <Stack direction={"column"} >
                    {isLoading && <Loader />}
                    {data && 
                        <Stack direction={"row"} spacing={2} >
                            <UserAvatar id={props.id} />
                            <Typography align='center' variant={"h1"}>{data[0].usr_name}</Typography>
                        </Stack>
                    }
                </Stack>
            );
        case 'small':
        default:
            return (
                <Stack direction={"column"} >
                    {isLoading && <Loader />}
                    {data && 
                        <Stack direction={"column"} spacing={1} >
                            <UserAvatar id={props.id} />
                            <Typography align='center' variant={"h1"}>{data[0].usr_name}</Typography>
                        </Stack>
                    }
                </Stack>
            );
    }
}
