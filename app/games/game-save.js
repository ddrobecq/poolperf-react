import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack, Switch, Typography } from "@mui/material";
import Loader from "../lib/loader";
import { useEffect, useState } from "react";
import Transition from "../lib/transition";
import useFetch from "../lib/fetchAPI";

function GameSaveDialogPlayerLine(props) {
    const [checked, setChecked] = useState(true);
    
    //TO DO : TO BE REMOVED WHEN INCLUDE USR_NAME IN PLAYER OBJECT IN API
    const [userData, isLoading] = useFetch (`/users/${props.player.playerId}`, "GET", null);
    const [name, setName] = useState (props.player.name);

    useEffect (() => {
        if (userData) {
            setName(userData[0].usr_name);
        }
    }, [userData]);
    //END TO DO

    function handleChecked() {
        setChecked(!checked);
    }

    if (props.player){
        return (
            <Stack direction={"row"} spacing={2} alignItems={'center'}>
                <Typography>Pour {name} ?</Typography>
                <Box  >
                    {(props.isConfirmed && checked) 
                        ? <GamePlayerSave player={props.player} />
                        : <Switch checked={checked} onChange={handleChecked} />
                    }
                </Box>
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
        <Dialog 
          open={open} 
          onClose={handleClose} 
          TransitionComponent={Transition} 
          keepMounted >
            <DialogTitle>Enregistrer la partie ?</DialogTitle>
            <DialogContent>
                <Stack direction={"column"} spacing={2} >
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
    const [playerSaved, isSaving] = useFetch (`/games`, "POST", strGameBody (props.player));
    const [isSaved, setIsSaved] = useState (false);

    /* BUILD JSON BODY FOR SAVNG A GAME */
    function strGameBody (player){
        let body = {
          gameType: "gameType", //TODO getParam ("gameType"),
          player: player
        };
        let strBody = JSON.stringify (body);
        return strBody;
      }
    
    useEffect (() => {
        if (playerSaved) {
            setIsSaved(true);
        }
    }, [playerSaved]);
      
    if (isSaving) {
        return (<Loader />);
    } else {
        if (isSaved) {
            return (
                <div>
                    <p>saved</p>
                </div>
            );
        } else {
            return (
                <div>
                    <p>error</p>
                </div>
            );
        }
    }
}