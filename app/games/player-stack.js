'use client';

import { Button, Stack, Typography } from "@mui/material";
import BallButton from "../lib/button";
import { useEffect, useState } from "react";
import UserInfo from "../users/[id]/user-info";
import UserSelectDialog from "../users/[id]/user-select";
import { _DEBUG } from "../lib/tools";

function PlayerItem(props) {
    return (
        <BallButton 
            label={props.label} 
            value={props.value} 
            total={props.total} 
            onClick={props.handleClick} 
            color={props.color} 
        />
    );
}

function PlayerShot(props) {
    return (
        <PlayerItem label={'Coups'} {...props} />
    );
}
function PlayerPocket(props) {
    return (
        <PlayerItem label={'Empochées'} color={'success'} {...props}/>
    );
}

function PlayerFoul(props) {
    return (
        <PlayerItem label={'Fautes'} color={'warning'} {...props} />
    );
}

export default function PlayerStack(props) {
    const [nbShot, setNbShot] = useState(props.player.nbShot);
    const [nbPocket, setNbPocket] = useState(props.player.nbPocket);
    const [nbFoul, setNbFoul] = useState(props.player.nbFoul);
    const id = props.player.playerId;

    useEffect(() => {
        if (props.refresh) {
            setNbShot(0);
            setNbPocket(0);
            setNbFoul(0);
        }
    }, [props.refresh]);

    useEffect(() => {
        const player = {playerId: id, nbShot: nbShot, nbPocket: nbPocket, nbFoul: nbFoul};
        props.updatePlayer(player);
    }, [nbShot, nbPocket, nbFoul, props, id]);

    function handleClickNbShot() {
        setNbShot(nbShot + 1);
    }
    function getNbShot() {
        return nbShot;
    }
    
    function handleClickNbPocket() {
        setNbPocket(nbPocket + 1);
    }
    function getNbPocket() {
        return nbPocket;
    }

    function handleClickNbFoul() {
        setNbFoul(nbFoul + 1);
    }
    function getNbFoul() {
        return nbFoul;
    }

    return (
        <Stack direction={"column"} spacing={1} alignItems={"center"} justifyContent={"space-between"}>
            <PlayerButton id={id} direction={'column'} handleChangePlayer={props.handleChangePlayer} />
            <PlayerShot id={id} value={getNbShot()} handleClick={handleClickNbShot}/>
            <PlayerPocket id={id} value={getNbPocket()} total={getNbShot()} handleClick={handleClickNbPocket}/>
            <PlayerFoul id={id} value={getNbFoul()} total={getNbShot()} handleClick={handleClickNbFoul}/>
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

    function onSelect(id) {
        handleChangePlayer(id);
        handleClose();
    }

    return (
        <Stack direction={"row"} spacing={1}>
            <Button onClick={handleUserSelect} variant={'text'} color={'inherit'} >
                <UserInfo {...props} />
            </Button>
            <UserSelectDialog
                open={open}
                onClose={handleClose}
                onSelect={onSelect} />
        </Stack>
    );
}