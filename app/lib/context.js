'use client';

import { createContext, useState } from "react";
import useLocalStorage from "./localdb";
import { _DEBUG } from "./tools";

export const GameContext = createContext(null);

export default function GameContextProvider({children}) {
    const [ player1Id, setPlayer1Id ] = useLocalStorage('PlayerId1', 1);
    const [ player2Id, setPlayer2Id ] = useLocalStorage('PlayerId2', 2);
    const [game, setGame] = useState(initGame());

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