'use client';

import { Stack, Typography } from "@mui/material";
import CustomButton from "../lib/button";
import useFetch from "../lib/fetchAPI";
import Loader from "../lib/loader";
import { useEffect, useState } from "react";
import { _DEBUG } from "../lib/tools";

function PlayerInfoShort(props) {
    const id = props.id
    const [data, isLoading] = useFetch (`/users/${id}`, "GET", null, true);

    if (isLoading) {
        return <Loader />;
    }
    else {
        if (!data) {
            return <Typography>Erreur</Typography>;
        }
        return (
            <Stack direction={"row"}>
                <CustomButton variant="contained">
                    {data[0].usr_name}
                </CustomButton>
            </Stack>
        );
    } 
}

function PlayerItem(props) {
    return (
        <Stack direction={"row"}>
            <CustomButton onClick={props.handleClick} color={props.color} >
                <Stack direction={"column"} alignItems={"center"} justifyContent={"center"}>
                    <Typography>{props.label}</Typography>
                    <Typography>{props.value}</Typography>
                    {(props.total) && <Typography>{Math.round(props.value / props.total * 100)}%</Typography>}
                </Stack>
            </CustomButton>
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
        <Stack direction={"column"} spacing={2} alignItems={"center"} justifyContent={"space-between"}>
            <PlayerInfoShort id={props.id} />
            <PlayerShot id={props.id} value={getNbShot()} handleClick={handleClickNbShot}/>
            <PlayerPocket id={props.id} value={getNbPocket()} total={getNbShot()} handleClick={handleClickNbPocket}/>
            <PlayerFoul id={props.id} value={getNbFoul()} total={getNbShot()} handleClick={handleClickNbFoul}/>
        </Stack>
    );
}