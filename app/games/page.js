'use client';

import PlayerStack from "./player-stack";
import GameSaveDialog from "./game-save";
import { useContext, useEffect, useState } from "react";
import { Button, Divider, Chip, Stack } from "@mui/material";
import useLocalStorage from "../lib/localdb";
import NotStartedIcon from '@mui/icons-material/NotStarted';
import SaveIcon from '@mui/icons-material/Save';
import GavelIcon from '@mui/icons-material/Gavel';
import GameRulesDialog from "./game-rules";
import GameNewDialog from "./game-new";
import { GameContext } from "../lib/context";
import useSleepLock from "../lib/sleepLock";

export default function Game(props) {
  const [openSave, setOpenSave] = useState(false);
  const [openRules, setOpenRules] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const { game, setGame } = useContext(GameContext);
  const [isSupported, isActive, request, release] = useSleepLock();
  const [sleepLock, setSleepLock] = useLocalStorage('is-sleep-locked', true);

  useEffect(() => {
    if (isSupported && sleepLock && !isActive) request();
  }), [sleepLock, isSupported, isActive];

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
    <Stack direction={"column"} spacing={1} justifyContent={'space-between'}>
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
        {(isSupported)
            ? <Chip key={'active'} label={(isActive) ? 'A' : 'D'} color={(isActive) ? 'success' : 'warning'} />
            : <Chip key={'supported'} label={'N'} color={'error'} />}
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