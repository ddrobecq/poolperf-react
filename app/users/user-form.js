import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField } from "@mui/material";
import UserAvatar from "./[id]/user-avatar";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SaveIcon from '@mui/icons-material/Save';
import UserSave from "./user-save";
import { useState } from "react";
import Transition from "../lib/transition";

export default function UserForm (props) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [name, setName] = useState(props.name);

    function onCancel () {
        props.onClose(false);
    }

    function onUpdate () {
        setIsUpdating(true);
    }

    function onValidate () {
        props.onClose(true);
    }

    return (
        <Dialog open={props.open} onClose={props.onClose} TransitionComponent={Transition} >
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                <Stack direction={"row"} spacing={1} >
                    <UserAvatar id={props.id} />
                    <IconButton aria-label="change-avatar" size="large" >
                        <CameraAltIcon />
                    </IconButton>
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
                ? <UserSave id={props.id} name={name} onClose={onValidate} />
                : <Button color={"success"} onClick={onUpdate} startIcon={<SaveIcon />} >Enregistrer</Button>}
            </DialogActions>
        </Dialog>
    );
}