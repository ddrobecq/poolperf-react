import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useContext } from "react";
import { GameContext } from "./game-context";

export default function GameRulesDialog(props) {
    const {game, setGame} = useContext(GameContext);
    const title = (game) ? "Règle du jeu " + game.type : "";

    function handleConfirm() {
        props.onClose(true);
    }

    return (
        <Dialog
          open={props.open} 
          onClose={handleConfirm} 
          keepMounted >
            <DialogTitle>{title}</DialogTitle>
            <DialogActions>
                <Button onClick={handleConfirm} >Fermer</Button>
            </DialogActions>
        </Dialog>
    );
}