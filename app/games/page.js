'use client';

import { Stack } from "@mui/system";
import PlayerStack from "./player-stack";
import GameSaveDialog from "./game-save";
import { useState } from "react";
import { Button, Divider } from "@mui/material";
import useLocalStorage from "../lib/localdb";
import { currentGame } from "../page";
import NotStartedIcon from '@mui/icons-material/NotStarted';
import SaveIcon from '@mui/icons-material/Save';
import GavelIcon from '@mui/icons-material/Gavel';
import GameRulesDialog from "./game-rules";
import GameNewDialog from "./game-new";
import { _DEBUG } from "../lib/tools";

export default function Game(props) {
  const [localStoragePlayerId1, setLocalStoragePlayerId1] = useLocalStorage("PlayerId1", 1);
  const [localStoragePlayerId2, setLocalStoragePlayerId2] = useLocalStorage("PlayerId2", 2);
  currentGame.player1.playerId = localStoragePlayerId1;
  currentGame.player2.playerId = localStoragePlayerId2;
  const [openSave, setOpenSave] = useState(false);
  const [openRules, setOpenRules] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [refresh, setRefresh] = useState(false);

  function handleClose () {
    setOpenSave(false);
    setOpenRules(false);
  };

  function handleCloseNew(create) {
    setOpenNew(false);
    if (create) {
      currentGame.reset();
      setRefresh (true);
    }
  };

  function handleSaveGame() {
    setLocalStoragePlayerId1(currentGame.player1.playerId);
    setLocalStoragePlayerId2(currentGame.player2.playerId);
    setOpenSave(true);
  };

  function handleShowRules() {
    setOpenRules(true);
  };

  function handleNew() {
    setOpenNew(true);
  };

  function handleChangePlayer1(id) {
    currentGame.player1.playerId = id;
    setLocalStoragePlayerId1(currentGame.player1.playerId);
  };

  function handleChangePlayer2(id) {
    currentGame.player2.playerId = id;
    setLocalStoragePlayerId2(currentGame.player2.playerId);
  };

  function updatePlayer1(player) {
    currentGame.player1 = player;
    if (refresh) setRefresh (false);
  };

  function updatePlayer2(player) {
    currentGame.player2 = player;
    if (refresh) setRefresh (false);
  };

  return (
    <Stack direction={"column"} spacing={1} justifyContent={'space-between'}>
      <Stack direction={"row"} spacing={2} justifyContent={"space-around"}>
        <PlayerStack refresh={refresh} player={currentGame.player1} handleChangePlayer={handleChangePlayer1} updatePlayer={updatePlayer1} />
        <Divider orientation="vertical" flexItem />
        <PlayerStack refresh={refresh} player={currentGame.player2} handleChangePlayer={handleChangePlayer2} updatePlayer={updatePlayer2}/>
      </Stack>
      <Stack direction={"row"} spacing={2} alignItems={"center"} >
        <Button onClick={handleNew} variant="contained" startIcon={<NotStartedIcon />} >Nouvelle</Button>
        <Button onClick={handleShowRules} variant="contained" startIcon={<GavelIcon />} >Règles</Button>
        <Button onClick={handleSaveGame} variant="contained" startIcon={<SaveIcon />} >Enregistrer</Button>
      </Stack>
      <GameSaveDialog
        open={openSave}
        onClose={handleClose}
        player1={currentGame.player1}
        player2={currentGame.player2} />
      <GameRulesDialog
        open={openRules}
        onClose={handleClose} />
      <GameNewDialog
        open={openNew}
        onClose={handleCloseNew} />
    </Stack>
  );
}