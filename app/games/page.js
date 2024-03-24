'use client';

import { Stack } from "@mui/system";
import PlayerStack from "./player-stack";
import CommandButton from "../lib/button";
import GameSaveDialog from "./game-save";
import { useState } from "react";
import { Divider } from "@mui/material";
import useLocalStorage from "../lib/localdb";

export default function Game() {
  const [playerId1, setPlayerId1] = useLocalStorage("PlayerId1", 1);
  const [playerId2, setPlayerId2] = useLocalStorage("PlayerId2", 2);
  let player1 = {playerId: playerId1, name:'', nbShot: 0, nbPocket: 0, nbFoul: 0};
  let player2 = {playerId: playerId2, name:'', nbShot: 0, nbPocket: 0, nbFoul: 0};
  const [open, setOpen] = useState(false);

  function handleClose () {
    setOpen(false);
  };

  function handleSaveGame() {
    setOpen(true);
    setPlayerId1(player1.playerId);
    setPlayerId2(player2.playerId);
  };

  function handleShowRules() {
  };

  function handleChangePlayer1(id) {
    player1.playerId = id;
    alert("Player1: " + player1.playerId);
  };

  function handleChangePlayer2(id) {
    player2.playerId = id;
    alert("Player2: " + player2.playerId);
  };

  return (
    <Stack direction={"column"} spacing={2} justifyContent={'space-between'}>
      <Stack direction={"row"} spacing={2} justifyContent={"space-around"}>
        <PlayerStack id={player1.playerId} handleChangePlayer={handleChangePlayer1} />
        <Divider orientation="vertical" flexItem />
        <PlayerStack id={player2.playerId} handleChangePlayer={handleChangePlayer2} />
      </Stack>
      <Divider />
      <Stack direction={"column"} spacing={2} alignItems={"center"}>
        <CommandButton onClick={handleShowRules} >Règles</CommandButton>
        <CommandButton onClick={handleSaveGame} >Enregistrer</CommandButton>
      </Stack>
      <GameSaveDialog
        open={open}
        onClose={handleClose}
        player1={player1}
        player2={player2} />
    </Stack>
  );
}