import {Game} from "../../service/Game";

export abstract class Scene {
  abstract gameState: string;
  abstract name: string;

  abstract init(game: Game);

  cleanUp(game: Game) {
    game.gameArea.clear();
  }

  onGameStateChange(oldGameState: string, game: Game) {
    if(game.state === this.gameState) {
      this.init(game);
      console.log('Initiating scene: ' + this.name);
    }
    if(oldGameState === this.gameState) {
      this.cleanUp(game);
      console.log('Cleaning up scene: ' + this.name);
    }
  }
}
