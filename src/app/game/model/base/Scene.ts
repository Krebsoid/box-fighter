import {Game} from "../../service/Game";
import {Shape} from "./shapes/Shape";
import {Sprite} from "./shapes/Sprite";
import {Vector} from "./Vector";
import {SceneCatalogue} from "../catalogues/SceneCatalogue";

export abstract class Scene {
  abstract type: SceneCatalogue;
  abstract name: string;
  abstract levelBorders: Shape;
  abstract hasBackground: boolean;

  background(game: Game) {
    let background = new Sprite(-1500, -1010, -10, 2000, 4000, "assets/background.png", () => undefined)
      .isVisible(true).isCollidable(false).isDangerous(false).isDestructible(false);
    let sun = new Sprite(300, 30, -15, 200, 200, "assets/sun.png", () => undefined)
      .isVisible(true).isCollidable(false).isDangerous(false).isDestructible(false);
    background.addBehaviour("playerMoving", (game: Game, shape: Sprite) => {
      if(game.controls.isMoving() && game.player.engine.level > 0) {
        shape.move(new Vector(game.player.velocity.x, 0).multiply(-.2));
      }
    });
    sun.addBehaviour("playerMoving", (game: Game, shape: Sprite) => {
      if(game.controls.isMoving() && game.player.engine.level > 0) {
        shape.move(new Vector(game.player.velocity.x, 0).multiply(.8));
      }
    });
    game.gameArea.addElement(sun);
    game.gameArea.addElement(background);
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
