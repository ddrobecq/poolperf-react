import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import Transition from "../lib/transition";
import { currentGame } from "../page";

export default function GameRulesDialog(props) {
    const {onClose, open} = props;

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
          TransitionComponent={Transition} 
          keepMounted >
            <DialogTitle>Régle du jeu {currentGame.type}</DialogTitle>
            <DialogActions>
                <Button onClick={handleCancel}>Non</Button>
                <Button onClick={handleConfirm} type="submit">Oui</Button>
            </DialogActions>
        </Dialog>
    );
}