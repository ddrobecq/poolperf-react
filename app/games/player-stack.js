'use client';

import { Button, Stack } from "@mui/material";
import BallButton from "../lib/button";
import { useContext, useState } from "react";
import UserInfo from "../users/[id]/user-info";
import UserSelectDialog from "../users/[id]/user-select";
import { _DEBUG } from "../lib/tools";
import { GameContext } from "../lib/context";

function PlayerItem(props) {
    const { game, setGame } = useContext(GameContext);

    function handleClick() {
        let currentGame = game;
        currentGame.players[props.id][props.item] = currentGame.players[props.id][props.item] + 1;
        currentGame.playerActive = props.id;
        setGame({...currentGame});
    }

    function isActive() {
        if (props.item === 'nbShot') return true;
        if (game && game.playerActive === props.id) return true;
        return (false);
    }
    return (
        (game) &&
        <BallButton 
            label={props.label} 
            value={game.players[props.id][props.item]} 
            total={game.players[props.id].nbShot} 
            item={props.item}
            onClick={handleClick} 
            disabled={(!isActive())}
        />
    );
}

function PlayerShot(props) {
    return (<PlayerItem item={'nbShot'} label={'Coups'} {...props} />);
}

function PlayerPocket(props) {
    return (<PlayerItem item={'nbPocket'} label={'Empochées'} {...props}/>);
}

function PlayerFoul(props) {
    return (<PlayerItem item={'nbFoul'} label={'Fautes'} {...props} />);
}

export default function PlayerStack(props) {
    const { game, setGame } = useContext(GameContext);
    const playerId = (game) ? game.players[props.id].playerId : 0;

    return (
        <Stack direction={"column"} spacing={1} alignItems={"center"} justifyContent={"space-between"}>
            <PlayerButton id={props.id} playerId={playerId} direction={'column'} handleChangePlayer={props.handleChangePlayer} />
            <PlayerShot id={props.id}  />
            <PlayerPocket id={props.id}  />
            <PlayerFoul id={props.id}  />
        </Stack>
    );
}

function PlayerButton (props) {
    const [open, setOpen] = useState(false);
    const handleChangePlayer = props.handleChangePlayer;

    function handleClose () {
       setOpen(false);
    };

    function handleUserSelect() {
        setOpen(true);
    };

    function onSelect(playerId) {
        handleChangePlayer(props.id, playerId);
        handleClose();
    }

    return (
        <Stack direction={"row"} spacing={1}>
            <Button onClick={handleUserSelect} variant={'text'} color={'inherit'} >
                <UserInfo id={props.playerId} direction={'column'} />
            </Button>
            <UserSelectDialog
                open={open}
                onClose={handleClose}
                onSelect={onSelect} />
        </Stack>
    );
}