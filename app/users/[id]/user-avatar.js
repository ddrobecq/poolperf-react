import { Avatar, Stack, SvgIcon, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

export default function UserAvatar(props) {
    return (
        <Stack direction={"column"} justifySelf={'center'} >
            <Avatar 
                alt={props.name}
                src={'data:image/png;base64,'+ props.img}
                sx={{ width: 100, height: 100 }}
            >
                <SvgIcon sx={{fontSize: 100}} >
                    <PersonIcon fontSize="large" />
                </SvgIcon>
            </Avatar>
        </Stack>
    );
}