import { Avatar, Stack, SvgIcon, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import useFetch from "@/app/lib/fetchAPI";
import { _DEBUG } from "@/app/lib/tools";

export default function UserAvatar(props) {
    const id = (props.id) ? props.id : 0;
    const [data, isLoading] = useFetch (`/users/${id}/image`, 'GET', null);
    const image = (data && data.length>0) ? data[0].usr_avatar : null;

    return (
        <Stack direction={"column"} alignItems={'center'} >
            <Avatar 
                alt={props.name}
                src={'data:image/png;base64,'+ image}
                sx={{ width: 90, height: 90 }} />
        </Stack>
    );
}