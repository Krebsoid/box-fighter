import {Game} from "../../service/Game";

export abstract class Scene {
  abstract gameState: string;
  abstract name: string;

  abstract init(game: Game);

  cleanUp(game: Game) {
    game.gameArea.clear();
  }
}
