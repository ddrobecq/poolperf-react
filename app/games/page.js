'use client';

import PlayerStack from "./components/player-stack";
import GameSaveDialog from "./components/game-save";
import { useContext, useEffect, useState } from "react";
import { Button, Divider, Stack } from "@mui/material";
import useLocalStorage from "@/components/localdb";
import NotStartedIcon from '@mui/icons-material/NotStarted';
import SaveIcon from '@mui/icons-material/Save';
import GavelIcon from '@mui/icons-material/Gavel';
import GameRulesDialog from "./components/game-rules";
import GameNewDialog from "./components/game-new";
import { GameContext } from "./components/game-context";
import { _STORAGE_KEY_IS_SLEEP_LOCKED } from "@/components/constants";
import { _DEBUG } from "@/components/tools";
import WakeLock from "@/components/wake-lock/wake-lock";

export default function Game(props) {
  const [openSave, setOpenSave] = useState(false);
  const [openRules, setOpenRules] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const { game, setGame } = useContext(GameContext);
  const [sleepLock, setSleepLock] = useLocalStorage(_STORAGE_KEY_IS_SLEEP_LOCKED, true);

  function handleClose () {
    setOpenSave(false);
    setOpenRules(false);
  };

  function handleCloseNew(create) {
    setOpenNew(false);
    if (create) {
      let newGame = game;
      newGame.reset();
      setGame({...newGame});
    }
  };

  function handleSaveGame() {
    setOpenSave(true);
  };

  function handleShowRules() {
    setOpenRules(true);
  };

  function handleNew() {
    setOpenNew(true);
  };

  function handleChangePlayer (id, playerId) {
    let currentGame = game;
    currentGame.players[id].playerId = playerId;
    setGame({...currentGame});
  }

  return (
    <Stack direction={"column"} spacing={2} justifyContent={'space-between'}>
      <WakeLock preventSleep={sleepLock} />
      <Stack direction={"row"} spacing={2} justifyContent={"space-around"}>
        <PlayerStack id={0} handleChangePlayer={handleChangePlayer} />
        <Divider orientation="vertical" flexItem />
        <PlayerStack id={1} handleChangePlayer={handleChangePlayer} />
      </Stack>
      <Divider/>
      <Stack direction={"row"} spacing={2} justifyContent={'center'} >
        <Button onClick={handleNew} variant="contained" startIcon={<NotStartedIcon />} >Nouvelle</Button>
        <Button onClick={handleShowRules} variant="contained" startIcon={<GavelIcon />} >Règles</Button>
        <Button onClick={handleSaveGame} variant="contained" startIcon={<SaveIcon />} >Enregistrer</Button>
      </Stack>
      <GameSaveDialog
        open={openSave}
        onClose={handleClose}
        player1={(game && game.players) ? game.players[0] : null}
        player2={(game && game.players) ? game.players[1] : null} />
      <GameRulesDialog
        open={openRules}
        onClose={handleClose} />
      <GameNewDialog
        open={openNew}
        onClose={handleCloseNew} />
    </Stack>
  );
}