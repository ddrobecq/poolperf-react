import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useRouter } from "next/navigation";
import { _DEBUG } from "../lib/tools";

export default function GameNewDialog(props) {
    const {onClose, open} = props;
    const router = useRouter();

    function handleConfirm() {
        onClose(true);
    }

    function handleCancel() {
        onClose(false);
    }

    return (
        <Dialog
          open={open} 
          onClose={handleCancel} 
          keepMounted >
            <DialogTitle>Démarrer une nouvelle partie ?</DialogTitle>
            <DialogActions>
                <Button onClick={handleCancel}>Non</Button>
                <Button color={"success"} onClick={handleConfirm} >Oui</Button>
            </DialogActions>
        </Dialog>
    );
}