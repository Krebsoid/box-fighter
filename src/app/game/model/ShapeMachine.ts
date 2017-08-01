import {Element} from "./base/Element";
import {Game} from "../service/Game";
import {Random} from "../service/util/Random";
import {HomingColoredShape} from "./base/HomingColoredShape";

export class ShapeMachine extends Element {

  constructor() {
    super(0, 0, 0);
  }

  update(game: Game) {
    if(game.gameTime % 50 == 0) {
      let size = Random.nextNumber(20, 70);
      let player = game.gameArea.getPlayer();
      if(player) {
        let shape = new HomingColoredShape(1500, Random.nextNumber(0, 300), Random.nextNumber(1, 1000), size, size, Random.nextColor(), player);
        shape.isDestructible(true);
        let speed = Random.nextNumber(1, 7);
        shape.addBehaviour<HomingColoredShape>("left", (game, shape) => {
          shape.moveTo(speed);
          if(shape.x < 0) {
            game.gameArea.removeElement(shape);
          }
        });
        game.gameArea.addElement(shape);
      }
    }
  }
}
