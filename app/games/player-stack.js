'use client';

import { Button, Stack } from "@mui/material";
import BallButton from "./ball-button";
import { useContext, useEffect, useState } from "react";
import { UserName } from "../users/[id]/user-info";
import UserSelectDialog from "../users/[id]/user-select";
import { GameContext } from "./game-context";
import ProgressiveBar from "./progressive-bar";
import UserAvatar from "../users/[id]/user-avatar";
import NoSleep from '@uriopass/nosleep.js';
import { _DEBUG } from "../lib/tools";

function PlayerItem(props) {
    const { game, setGame } = useContext(GameContext);
    const [ isNoSleepEnabled, setIsNoSleepEnabled ] = useState(false);
    let noSleep = new NoSleep();

    function handleClick() {
        let currentGame = game;
        currentGame.players[props.id][props.item] = currentGame.players[props.id][props.item] + 1;
        currentGame.playerActive = props.id;
        setGame({...currentGame});
        if (!isNoSleepEnabled) {
            _DEBUG('Enable NoSleep');
            document.addEventListener('click', function enableNoSleep() {
                document.removeEventListener('click', enableNoSleep, false);
                noSleep.enable();
                setIsNoSleepEnabled(true);
                alert (noSleep.isEnabled);
            }, false);
        }   
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
            total={(props.totalDisplay) ? game.players[props.id].nbShot : 0} 
            item={props.item}
            onClick={handleClick} 
            disabled={(!isActive())}
        />
    );
}

function PlayerShot(props) {
    return (<PlayerItem item={'nbShot'} label={'Coups'} {...props} totalDisplay={false} />);
}

function PlayerPocket(props) {
    return (<PlayerItem item={'nbPocket'} label={'Empochées'} totalDisplay {...props}/>);
}

function PlayerFoul(props) {
    return (<PlayerItem item={'nbFoul'} label={'Fautes'} totalDisplay {...props} />);
}

export default function PlayerStack(props) {
    const { game, setGame } = useContext(GameContext);
    const playerId = (game) ? game.players[props.id].playerId : 0;
    const [playerName, setPlayerName] = useState((game) ? game.players[props.id].name : null);

    useEffect(() => {
        if (game.players[props.id].name) {
            setPlayerName(game.players[props.id].name);
        }
    }, [game, setPlayerName, props.id]);

    return (
        <Stack direction={"column"} spacing={1} alignItems={"center"} justifyContent={"space-between"}>
            <PlayerButton id={props.id} playerId={playerId} playerName={playerName} handleChangePlayer={props.handleChangePlayer} />
            <PlayerShot id={props.id}  />
            <Stack direction={'column'} spacing={0} alignItems={"center"} >
                <PlayerPocket id={props.id}  />
                <ProgressiveBar id={props.id} item={'nbPocket'} data={game.players[props.id].stats} />
            </Stack>
            <Stack direction={'column'} spacing={0} alignItems={"center"} >
                <PlayerFoul id={props.id}  />
                <ProgressiveBar id={props.id} item={'nbFoul'} data={game.players[props.id].stats} />
            </Stack>
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
                <Stack direction={'column'} alignItems={'center'} spacing={1} >
                    <UserAvatar id={props.playerId} />
                    <UserName name={props.playerName} />
                </Stack>
            </Button>
            <UserSelectDialog
                open={open}
                onClose={handleClose}
                onSelect={onSelect} />
        </Stack>
    );
}