'use client';

import { createContext, useEffect, useState } from "react";
import useLocalStorage from "./localdb";
import { _DEBUG } from "./tools";
import { _STORAGE_KEY_PLAYER_ID1, _STORAGE_KEY_PLAYER_ID2 } from "./constants";

export const GameContext = createContext(null);

export default function GameContextProvider({children}) {
    const [ player1Id, setPlayer1Id ] = useLocalStorage(_STORAGE_KEY_PLAYER_ID1, 1);
    const [ player2Id, setPlayer2Id ] = useLocalStorage(_STORAGE_KEY_PLAYER_ID2, 2);
    const [game, setGame] = useState(initGame());

    useEffect(() => {
        if (game.players[0].playerId !== player1Id) {
            setPlayer1Id(game.players[0].playerId);
        }
        if (game.players[1].playerId !== player2Id) {
            setPlayer2Id(game.players[1].playerId);
        }
    },[game, player1Id, player2Id, setPlayer1Id, setPlayer2Id]);

    function initGame() {
        const newGame = {
            type: '8-ball',
            playerActive: -1,
            players: [
                {playerId: player1Id, name:'', nbShot: 0, nbPocket: 0, nbFoul: 0},
                {playerId: player2Id, name:'', nbShot: 0, nbPocket: 0, nbFoul: 0}
            ],
            reset: function() {
                this.playerActive = -1;
                this.players.forEach(element => {
                    element.nbShot = 0;
                    element.nbPocket = 0;
                    element.nbFoul = 0;
                    element.nbShot = 0;
                    element.nbPocket = 0;
                    element.nbFoul = 0;
                });
            }
          };
        return (newGame);
    }

    return (
        <GameContext.Provider value={{game, setGame}}>
            {children}
        </GameContext.Provider>
    );
}