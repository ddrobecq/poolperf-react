import Game from './games/page';
import { _DEBUG } from './lib/tools';

let currentGame = {
  id: 0,
  type: '8-ball',
  player1 : {playerId: 0, name:'', nbShot: 0, nbPocket: 0, nbFoul: 0},
  player2 : {playerId: 0, name:'', nbShot: 0, nbPocket: 0, nbFoul: 0},
  isActive: true,
  reset: function() {
    this.id++;
    this.player1.nbShot = 0;
    this.player1.nbPocket = 0;
    this.player1.nbFoul = 0;
    this.player2.nbShot = 0;
    this.player2.nbPocket = 0;
    this.player2.nbFoul = 0;
    this.isActive = true;
  }
};
export { currentGame };

export default function Home() {

  return (
    <Game/>
  );
}
