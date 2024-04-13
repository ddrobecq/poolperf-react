'use client';

import { createContext, useCallback, useEffect, useState } from "react";
import useLocalStorage from "../lib/localdb";
import { _DEBUG } from "../lib/tools";
import { _STORAGE_KEY_PLAYER_ID1, _STORAGE_KEY_PLAYER_ID2 } from "../lib/constants";
import useFetch from "../lib/fetchAPI";

export const GameContext = createContext(null);

export default function GameContextProvider({children}) {
    const [ player1Id, setPlayer1Id ] = useLocalStorage(_STORAGE_KEY_PLAYER_ID1, 1);
    const [ player2Id, setPlayer2Id ] = useLocalStorage(_STORAGE_KEY_PLAYER_ID2, 2);
    const [game, setGame] = useState(initGame());
    const [player1Data, isLoadingPlayer1Data] = useFetch (`/users/${game.players[0].playerId}`, 'GET', null);
    const [player2Data, isLoadingPlayer2Data] = useFetch (`/users/${game.players[1].playerId}`, 'GET', null);
    const [player1StatData, isLoadingPlayer1StatData] = useFetch (`/users/${game.players[0].playerId}/stats`, 'GET', null);
    const [player2StatData, isLoadingPlayer2StatData] = useFetch (`/users/${game.players[1].playerId}/stats`, 'GET', null);

    //Update name of players
    const setName = useCallback((id, name) => {
        let currentGame = game;
        currentGame.players[id].name = name;
        setGame({...currentGame});
    }, [game, setGame]);

    useEffect(() => {
        if (player1Data && player1Data.length > 0 && game.players[0].name === null) {
            setName(0, player1Data[0].usr_name);
        }
    }, [player1Data, game, setGame, setName]);

    useEffect(() => {
        if (player2Data && player2Data.length > 0  && game.players[1].name === null) {
            setName(1, player2Data[0].usr_name);
        }
    }, [player2Data, game, setGame, setName]);

    //Update stats of players
    const setStats = useCallback((id, stats) => {
        let currentGame = game;
        currentGame.players[id].stats = {
            nbPocket: {
                min: stats.minPocket,
                max: stats.maxPocket,
                avg: stats.avgPocket
            },
            nbFoul: {
                min: stats.minFoul,
                max: stats.maxFoul,
                avg: stats.avgFoul
            }
        };
        setGame({...currentGame});
    }, [game, setGame]);

    useEffect(() => {
        if (player1StatData && player1StatData.length > 0 && game.players[0].stats === null) {
            setStats(0, player1StatData[0]);
        }
    }, [player1StatData, game, setGame, setStats]);

    useEffect(() => {
        if (player2StatData && player2StatData.length > 0 && game.players[1].stats === null) {
            setStats(1, player2StatData[0]);
        }
    }, [player2StatData, game, setGame, setStats]);

    //Update player id
    useEffect(() => {
        if (game.players[0].playerId !== player1Id) {
            setPlayer1Id(game.players[0].playerId);
        }
        if (game.players[1].playerId !== player2Id) {
            setPlayer2Id(game.players[1].playerId);
        }
    },[game, player1Id, player2Id, setPlayer1Id, setPlayer2Id]);

    //Init game
    function initGame() {
        const newGame = {
            type: '8-ball',
            playerActive: -1,
            players: [
                {
                    playerId: player1Id, 
                    name: null, 
                    nbShot: 0, 
                    nbPocket: 0, 
                    nbFoul: 0,
                    stats: null
                },
                {
                    playerId: player2Id, 
                    name: null, 
                    nbShot: 0, 
                    nbPocket: 0, 
                    nbFoul: 0,
                    stats: null
                }
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
                    element.stats = null;
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