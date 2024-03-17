import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Slide, Stack, Switch, ToggleButtonGroup, Typography } from "@mui/material";
import Loader from "../lib/loader";
import { forwardRef, useState } from "react";
import CustomButton from "../lib/button";
import { _DEBUG } from "../lib/tools";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function GameSaveDialogPlayerLine(props) {
    const [checked, setChecked] = useState(true);

    function handleChecked() {
        setChecked(!checked);
    }
//    <GamePlayerSave player={props.player1} />
//    <GamePlayerSave player={props.player2} />

    if (props.player){
        return (
            <Stack direction={"row"} spacing={2} alignItems={'center'}>
                <Switch checked={checked} onChange={handleChecked} />
                <Typography>Enregistrer la partie pour {props.player.name} ?</Typography>
                {(props.isConfirmed) 
                    ? <GamePlayerSave player={props.player} />
                    : <Typography >En attente</Typography>
                }
            </Stack>
        )}
    else return null;
}

export default function GameSaveDialog (props) {
    const [isConfirmed, setIsConfirmed] = useState (false);
    const {onClose, open} = props;

    function handleConfirm() {
        setIsConfirmed(true);
    }

    function handleCancel() {
        setIsConfirmed(false);
        handleClose();
    }

    function handleClose () {
        onClose();
    }

    return (
        <Dialog open={open} onClose={handleClose} TransitionComponent={Transition} keepMounted>
            <DialogTitle>Enregistrer la partie ?</DialogTitle>
            <DialogContent>
                <Stack direction={"column"} spacing={2} justifyContent={"space-around"}>
                    <GameSaveDialogPlayerLine player={props.player1} isConfirmed={isConfirmed} />
                    <GameSaveDialogPlayerLine player={props.player2} isConfirmed={isConfirmed} />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Annuler</Button>
                <Button onClick={handleConfirm} type="submit">Confirmer</Button>
            </DialogActions>
        </Dialog>
    );
}

function GamePlayerSave (props) {
    const player = props.player;
    const isSaving = true;
    //const [playerSaved, isSaving] = useFetch (`/games`, "PUT", strGameBody (player), false);

    /* BUILD JSON BODY FOR SAVNG A GAME */
    function strGameBody (player){
        let body = {
          gameType: "gameType", //getParam ("gameType"),
          player: player
        };
        let strBody = JSON.stringify (body);
        return strBody;
      }
  
    if (isSaving) {
        return (<Loader />);
    } else {
        return (
            <div>
                <p>saved</p>
            </div>
        );
    }
}