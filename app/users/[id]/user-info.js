import Loader from "@/app/lib/loader";
import { IconButton, Stack, Typography } from "@mui/material";
import useFetch from "@/app/lib/fetchAPI";
import UserAvatar from "./user-avatar";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export default function UserInfo(props) {
    const [data, isLoading] = useFetch (`/users/${props.id}`, "GET", null, true);

    switch (props.size) {
        case 'large':
            return (
                <Stack direction={"column"} >
                    {isLoading && <Loader />}
                    {data && 
                        <Stack direction={"row"} spacing={2} >
                            <UserAvatar name={data[0].usr_name} img={data[0].usr_avatar} />
                            <Typography align='center' variant={"h1"}>{data[0].usr_name}</Typography>
                            <IconButton aria-label="delete" size="large" >
                                <DeleteIcon />
                            </IconButton>
                            <IconButton aria-label="edit" size="large" >
                                <EditIcon />
                            </IconButton>
                            <IconButton aria-label="change-avatar" size="large" >
                                <AccountBoxIcon />
                            </IconButton>
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
                            <UserAvatar name={data[0].usr_name} img={data[0].usr_avatar} />
                            <Typography align='center' variant={"h1"}>{data[0].usr_name}</Typography>
                        </Stack>
                    }
                </Stack>
            );
    }
}
