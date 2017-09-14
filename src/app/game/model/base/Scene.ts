import {Game} from "../../service/Game";
import {Shape} from "./Shape";
import {SceneType} from "../scene/SceneType";
import {ColoredShape} from "./ColoredShape";

export abstract class Scene {
  abstract type: SceneType;
  abstract name: string;
  abstract levelBorders: Shape;
  abstract hasBackground: boolean;

  background(game: Game) {
    let width = this.levelBorders.w;
    let height = this.levelBorders.h;
    let numberOfLines = width / 50;
    let numberOfRows = height / 50;
    let index = 0;
    while(numberOfLines > index) {
      let shape = new ColoredShape(index * 50, 0, 0, this.levelBorders.h, 2, "#f4f4f4")
        .isCollidable(false)
        .isDangerous(false);
      game.gameArea.addElement(shape);
      index++;
    }
    index = 0;
    while(numberOfRows > index) {
      let shape = new ColoredShape(0, index * 50, 0, 2, this.levelBorders.w, "#f4f4f4")
        .isCollidable(false)
        .isVisible(true)
        .isDangerous(false);
      game.gameArea.addElement(shape);
      index++;
    }
  }
  init(game: Game) {
    if(this.hasBackground) {
      this.background(game);
    }
    this.playground(game);
  }

  abstract playground(gmae: Game);

  cleanUp(game: Game) {
    game.gameArea.clear();
    game.gameArea.repaint("static");
  }
}
