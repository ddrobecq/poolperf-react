'use client';

import { Button, Stack, Typography } from "@mui/material";
import { BallButton } from "../lib/button";
import { useEffect, useState } from "react";
import UserInfo from "../users/[id]/user-info";
import UserSelectDialog from "../users/[id]/user-select";
import { _DEBUG } from "../lib/tools";

function PlayerItem(props) {
    return (
        <Stack direction={"row"}>
            <BallButton onClick={props.handleClick} color={props.color} >
                <Stack direction={"column"} alignItems={"center"} justifyContent={"center"}>
                    <Typography>{props.label}</Typography>
                    <Typography>{props.value}</Typography>
                    {(props.total) && <Typography>{Math.round(props.value / props.total * 100)}%</Typography>}
                </Stack>
            </BallButton>
        </Stack>
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
    const [nbShot, setNbShot] = useState(0);
    const [nbPocket, setNbPocket] = useState(0);
    const [nbFoul, setNbFoul] = useState(0);

    useEffect(() => {
        const player = {playerId: props.id, nbShot: nbShot, nbPocket: nbPocket, nbFoul: nbFoul};
        props.updatePlayer(player);
    }, [nbShot, nbPocket, nbFoul, props]);

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
        <Stack direction={"column"} spacing={6} alignItems={"center"} justifyContent={"space-between"}>
            <PlayerButton id={props.id} direction={'column'} handleChangePlayer={props.handleChangePlayer} />
            <PlayerShot id={props.id} value={getNbShot()} handleClick={handleClickNbShot}/>
            <PlayerPocket id={props.id} value={getNbPocket()} total={getNbShot()} handleClick={handleClickNbPocket}/>
            <PlayerFoul id={props.id} value={getNbFoul()} total={getNbShot()} handleClick={handleClickNbFoul}/>
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