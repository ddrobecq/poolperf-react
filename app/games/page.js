'use client';

import { Stack } from "@mui/system";
import PlayerStack from "./player-stack";
import GameSaveDialog from "./game-save";
import { useContext, useEffect, useState } from "react";
import { Button, Divider } from "@mui/material";
import useLocalStorage from "../lib/localdb";
import NotStartedIcon from '@mui/icons-material/NotStarted';
import SaveIcon from '@mui/icons-material/Save';
import GavelIcon from '@mui/icons-material/Gavel';
import GameRulesDialog from "./game-rules";
import GameNewDialog from "./game-new";
import { _DEBUG } from "../lib/tools";
import { useWakeLock } from 'react-screen-wake-lock';
import { GameContext } from "../lib/context";

export default function Game(props) {
  const [openSave, setOpenSave] = useState(false);
  const [openRules, setOpenRules] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const { game, setGame } = useContext(GameContext);
  const [ localStoragePlayer1Id, setLocalStoragePlayer1Id ] = useLocalStorage('PlayerId1', 1);
  const [ localStoragePlayer2Id, setLocalStoragePlayer2Id ] = useLocalStorage('PlayerId2', 2);
  const { isSupported, released, request, release } = useWakeLock({
    onRequest: () => _DEBUG('Screen Wake Lock: requested!'),
    onError: () => console.error('An error happened when requesting the screen wake lock.'),
    onRelease: () => _DEBUG('Screen Wake Lock: released!'),
  });

  const player1Id = (game && game.players) ? game.players[0].playerId : null;
  const player2Id = (game && game.players) ? game.players[1].playerId : null;

  useEffect(() => {
    if (isSupported && (released === undefined || released === true)) {
      request();
    }
  }), [isSupported, released, request];

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
    setLocalStoragePlayer1Id(game.players[0].playerId);
    setLocalStoragePlayer2Id(game.players[1].playerId);
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
      </Stack>
      <GameSaveDialog
        open={openSave}
        onClose={handleClose}
        player1={player1Id}
        player2={player2Id} />
      <GameRulesDialog
        open={openRules}
        onClose={handleClose} />
      <GameNewDialog
        open={openNew}
        onClose={handleCloseNew} />
    </Stack>
  );
}