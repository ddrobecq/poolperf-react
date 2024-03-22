'use client';

import { Button, Stack, Typography } from "@mui/material";
import { BallButton } from "../lib/button";
import { useState } from "react";
import Link from "next/link";
import UserInfo from "../users/[id]/user-info";

function PlayerButton(props) {
    const id = props.id

    return (
        <Link href={`/users/${id}`} legacyBehavior passHref >
            <Button >
                <UserInfo id={id} size='small' />
            </Button>
        </Link>
    );
}

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
            <PlayerButton id={props.id} />
            <PlayerShot id={props.id} value={getNbShot()} handleClick={handleClickNbShot}/>
            <PlayerPocket id={props.id} value={getNbPocket()} total={getNbShot()} handleClick={handleClickNbPocket}/>
            <PlayerFoul id={props.id} value={getNbFoul()} total={getNbShot()} handleClick={handleClickNbFoul}/>
        </Stack>
    );
}