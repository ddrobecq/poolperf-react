import { Grid, IconButton, Input, InputBase, styled } from "@mui/material";
import { useState } from "react";
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const ImageButton = styled(InputBase)(({ theme }) => ({
    display: 'none',
}));
  
export default function Camera (props) {
    const [source, setSource] = useState('');

    function handleCapture (target) {
        if (target.files) {
            if (target.files.length !== 0) {
            const file = target.files[0];
            const newUrl = URL.createObjectURL(file);
            setSource(newUrl);
            }
        }
    };

    return (
        <Grid item xs={12}>
            <Input
                accept="image/*"
                id="icon-button-file"
                type="file"
                capture="user"
                onChange={(e) => handleCapture(e.target)}
            />  
            <label htmlFor="icon-button-file">
                <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                >
                <CameraAltIcon fontSize="large" color="primary" />
                </IconButton>
            </label>      
        </Grid>
    );
}