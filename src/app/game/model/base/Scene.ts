import {Game} from "../../service/Game";
import {Shape} from "./Shape";
import {SceneType} from "../scene/SceneType";

export abstract class Scene {
  abstract type: SceneType;
  abstract name: string;
  abstract levelBorders: Shape;

  abstract init(game: Game);

  cleanUp(game: Game) {
    game.gameArea.clear();
  }
}
