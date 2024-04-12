'use client';

import { Button, Stack } from "@mui/material";
import BallButton from "./ball-button";
import { useContext, useEffect, useState } from "react";
import UserInfo from "../users/[id]/user-info";
import UserSelectDialog from "../users/[id]/user-select";
import { GameContext } from "../lib/context";
import ProgressiveBar from "./progressive-bar";
import useFetch from "../lib/fetchAPI";

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
    const [ playerStat, isLoading ] = useFetch(`/users/${playerId}/stats`, "GET", null);
    const [ pocketStat, setPocketStat ] = useState(null);
    const [ foulStat, setFoulStat ] = useState(null);

    useEffect(() => {
        if (playerStat && playerStat.length > 0) {
            setPocketStat({
                avg: playerStat[0].avgPocket,
                min: playerStat[0].minPocket,
                max: playerStat[0].maxPocket
            });
            setFoulStat({
                avg: playerStat[0].avgFoul,
                min: playerStat[0].minFoul,
                max: playerStat[0].maxFoul
            });
        }
    }
    , [playerStat]);

    return (
        <Stack direction={"column"} spacing={1} alignItems={"center"} justifyContent={"space-between"}>
            <PlayerButton id={props.id} playerId={playerId} direction={'column'} handleChangePlayer={props.handleChangePlayer} />
            <PlayerShot id={props.id}  />
            <Stack direction={'column'} spacing={0} alignItems={"center"} >
                <PlayerPocket id={props.id}  />
                <ProgressiveBar id={props.id} item={'nbPocket'} data={pocketStat} />
            </Stack>
            <Stack direction={'column'} spacing={0} alignItems={"center"} >
                <PlayerFoul id={props.id}  />
                <ProgressiveBar id={props.id} item={'nbFoul'} data={foulStat} />
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
                <UserInfo id={props.playerId} direction={'column'} />
            </Button>
            <UserSelectDialog
                open={open}
                onClose={handleClose}
                onSelect={onSelect} />
        </Stack>
    );
}