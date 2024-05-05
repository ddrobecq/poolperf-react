import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import Users from "../page";

export default function UserSelectDialog(props) {

    function handleCancel() {
        props.onClose();
    }

    function handleSelect(id) {
        props.onSelect(id);
        props.onClose();
    }

    return (
        <Dialog open={props.open} onClose={props.onClose} >
            <DialogTitle>Sélectionnez un joueur</DialogTitle>
            <DialogContent>
                <Users actions={false} handleSelect={handleSelect} />
                <DialogActions>
                    <Button onClick={handleCancel} >Annuler</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}