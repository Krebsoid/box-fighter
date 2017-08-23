import {Game} from "../../service/Game";
import {Shape} from "./Shape";

export abstract class Scene {
  abstract gameState: string;
  abstract name: string;
  abstract levelBorders: Shape;

  abstract init(game: Game);

  cleanUp(game: Game) {
    game.gameArea.clear();
  }
}
