import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack, Switch, Typography } from "@mui/material";
import Loader from "../lib/loader";
import { useContext, useEffect, useState } from "react";
import Transition from "../lib/transition";
import useFetch from "../lib/fetchAPI";
import { _DEBUG } from "../lib/tools";
import { GameContext } from "../lib/context";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import DoneIcon from '@mui/icons-material/Done';
import CloudSyncIcon from '@mui/icons-material/CloudSync';

function GameSaveDialogPlayerLine(props) {
    const [checked, setChecked] = useState(true);
    const id = (props.player) ? props.player.playerId : 0;
    //TO DO : TO BE REMOVED WHEN INCLUDE USR_NAME IN PLAYER OBJECT IN API
    const [userData, isLoading] = useFetch (`/users/${id}`, "GET", null);
    const [name, setName] = useState (props.player.name);

    useEffect (() => {
        if (userData && userData.length>0) {
            setName(userData[0].usr_name);
        }
    }, [userData]);
    //END TO DO

    function handleChecked() {
        setChecked(!checked);
    }

    if (props.player) {
        return (
            <Stack direction={"row"} spacing={2} alignItems={'center'}>
                <Typography>Pour {name} ?</Typography>
                <Box  >
                    {(props.isConfirmed && checked) 
                        ? <GamePlayerSave player={props.player} onClose={props.onClose} />
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
        onClose();
    }

    function handleClose () {
        //onClose();
        _DEBUG("GameSaveDialog handleClose");
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
                    <GameSaveDialogPlayerLine player={props.player1} isConfirmed={isConfirmed} onClose={handleClose} />
                    <GameSaveDialogPlayerLine player={props.player2} isConfirmed={isConfirmed} onClose={handleClose} />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>{(!isConfirmed) ? 'Annuler' : 'Fermer'}</Button>
                <Button color={"success"} onClick={handleConfirm} disabled={isConfirmed} >Confirmer</Button>
            </DialogActions>
        </Dialog>
    );
}

function GamePlayerSave (props) {
    const [isSaved, setIsSaved] = useState (false);
    const {game, setGame} = useContext(GameContext);
    const [error, setError] = useState(false);
    const [result, isSaving] = useFetch (`/games`, "POST", strGameBody (props.player));

    /* BUILD JSON BODY FOR SAVNG A GAME */
    function strGameBody (player){
        let body = {
          gameType: game.type,
          player: player
        };
        let strBody = JSON.stringify (body);
        return strBody;
      }
    
    useEffect (() => {
        if (result) {
            if (result.affectedRows === 1) {
                setIsSaved (true);
            } else {
                setError (true);
            }
        } 
    }, [result]);
      
    useEffect(() => {
        if (isSaved) {
            props.onClose();
        } 
    }, [props, isSaved]);

    return (
        <>
            {(error) 
            ?   <Chip icon={<ReportProblemIcon/>} color={'error'} label={'Erreur'} />
            :   (isSaved)
                ?   <Chip icon={<DoneIcon/>} color={'success'} label={'Enregistré'} />
                :   <Chip icon={<CloudSyncIcon/>} color={'primary'} label={'En cours...'} />
            }
        </>
    );
}