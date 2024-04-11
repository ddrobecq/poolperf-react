import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField } from "@mui/material";
import UserAvatar from "./[id]/user-avatar";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SaveIcon from '@mui/icons-material/Save';
import UserSave from "./user-save";
import { useState } from "react";
import UserPictureDialog from "./user-picture";
import { Badge } from "@mui/icons-material";

export default function UserForm (props) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [name, setName] = useState(props.name);
    const [picture, setPicture] = useState(null);
    const [openCapture, setOpenCapture] = useState(false);

    function onCancel () {
        props.onClose(false);
    }

    function onUpdate () {
        setIsUpdating(true);
    }

    function onValidate () {
        props.onClose(true);
    }

    function openVideoCapture () {
        setOpenCapture(true);
    }

    function handleCloseCapture (capture) {
        if (capture) setPicture (capture);
        setOpenCapture(false);
    }

    return (
        <Dialog open={props.open} onClose={props.onClose} >
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                <Stack direction={"row"} spacing={1} >
                    <Stack direction={"row"} spacing={-3} alignItems={'baseline'} >
                        <UserAvatar id={props.id} />
                        <IconButton aria-label="change-avatar" size="large" onClick={openVideoCapture} >
                            <CameraAltIcon />
                        </IconButton>
                    </Stack>
                    <TextField 
                        defaultValue={name} 
                        label={'Nom du joueur'} 
                        onChange={(e) => setName(e.target.value)}
                        variant={'filled'} 
                        size={'large'}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>Annuler</Button>
                {(isUpdating)
                ? <UserSave id={props.id} name={name} picture={picture} onClose={onValidate} />
                : <Button color={"success"} onClick={onUpdate} startIcon={<SaveIcon />} >Enregistrer</Button>}
            </DialogActions>
            <UserPictureDialog open={openCapture} onClose={handleCloseCapture} />
        </Dialog>
    );
}