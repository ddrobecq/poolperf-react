import { Avatar, Stack, SvgIcon, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import useFetch from "@/app/lib/fetchAPI";

export default function UserAvatar(props) {
    const [data, isLoading] = useFetch ('/users/'+props.id+'/image', 'GET', null);
    const image = (data) ? data[0].usr_avatar : null;

    return (
        <Stack direction={"column"} justifySelf={'center'} >
            <Avatar 
                alt={props.name}
                src={'data:image/png;base64,'+ image}
                sx={{ width: 100, height: 100 }}
            >
                <SvgIcon sx={{fontSize: 100}} >
                    <PersonIcon fontSize="large" />
                </SvgIcon>
            </Avatar>
        </Stack>
    );
}