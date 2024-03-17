'use client';

import { Stack } from "@mui/system";
import PlayerStack from "./player-stack";
import { Divider } from "@mui/material";
import CustomButton from "../lib/button";
import GameSaveDialog from "./game-save";
import { useState } from "react";

export default function Page() {
  let player1 = {playerId: getPlayerId(1), name:'player1', nbShot: 0, nbPocket: 0, nbFoul: 0};
  let player2 = {playerId: getPlayerId(2), name:'player2', nbShot: 0, nbPocket: 0, nbFoul: 0};
  const [open, setOpen] = useState(false);

  function getPlayerId(id) {
    // TODO : get player id from local storage
    return id;
  };

  function handleClose () {
    setOpen(false);
  };

  function handleSaveGame() {
    setOpen(true);
    console.log("Enregistrer");
  };

  function handleShowRules() {
      console.log("Règles");
  };

  return (
    <Stack direction={"column"} spacing={2} justifyContent={"space-around"}>
      <Stack direction={"row"} spacing={2} justifyContent={"space-around"}>
        <PlayerStack id={player1.playerId} />
        <PlayerStack id={player2.playerId} />
      </Stack>
      <Divider />
      <Stack direction={"column"}spacing={2} alignItems={"center"}>
        <CustomButton onClick={handleShowRules} >Règles</CustomButton>
        <CustomButton onClick={handleSaveGame} >Enregistrer</CustomButton>
      </Stack>
      <GameSaveDialog
        open={open}
        onClose={handleClose}
        player1={player1}
        player2={player2} />
    </Stack>
  );
}