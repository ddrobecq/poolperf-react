'use client';

import { Stack } from "@mui/system";
import PlayerStack from "./player-stack";
import CommandButton from "../lib/button";
import GameSaveDialog from "./game-save";
import { useState } from "react";
import { Divider } from "@mui/material";
import useLocalStorage from "../lib/localdb";

export default function Game() {
  const [localStoragePlayerId1, setLocalStoragePlayerId1] = useLocalStorage("PlayerId1", 1);
  const [localStoragePlayerId2, setLocalStoragePlayerId2] = useLocalStorage("PlayerId2", 2);
  let player1 = {playerId: localStoragePlayerId1, nbShot: 0, nbPocket: 0, nbFoul: 0};
  let player2 = {playerId: localStoragePlayerId2, nbShot: 0, nbPocket: 0, nbFoul: 0};
  const [open, setOpen] = useState(false);

  function handleClose () {
    setOpen(false);
  };

  function handleSaveGame() {
    setLocalStoragePlayerId1(player1.playerId);
    setLocalStoragePlayerId2(player2.playerId);
    setOpen(true);
  };

  function handleShowRules() {
  };

  function handleChangePlayer1(id) {
    player1.playerId = id;
    setLocalStoragePlayerId1(player1.playerId);
  };

  function handleChangePlayer2(id) {
    player2.playerId = id;
    setLocalStoragePlayerId2(player2.playerId);
  };

  function updatePlayer1(player) {
    player1 = player;
  };

  function updatePlayer2(player) {
    player2 = player;
  };

  return (
    <Stack direction={"column"} spacing={2} justifyContent={'space-between'}>
      <Stack direction={"row"} spacing={2} justifyContent={"space-around"}>
        <PlayerStack index={1} id={player1.playerId} handleChangePlayer={handleChangePlayer1} updatePlayer={updatePlayer1} />
        <Divider orientation="vertical" flexItem />
        <PlayerStack index={2} id={player2.playerId} handleChangePlayer={handleChangePlayer2} updatePlayer={updatePlayer2}/>
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