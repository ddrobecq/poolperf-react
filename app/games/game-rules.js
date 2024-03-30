import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import Transition from "../lib/transition";
import { useContext } from "react";
import { GameContext } from "../lib/context";

export default function GameRulesDialog(props) {
    const {onClose, open} = props;
    const {game, setGame} = useContext(GameContext);
    const title = (game) ? "Règle du jeu " + game.type : "";

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
            <DialogTitle>{title}</DialogTitle>
            <DialogActions>
                <Button onClick={handleCancel}>Non</Button>
                <Button onClick={handleConfirm} type="submit">Oui</Button>
            </DialogActions>
        </Dialog>
    );
}