import {Element} from "./Element";
import {Game} from "../service/Game";
import {ColoredShape} from "./ColoredShape";
import {Random} from "../service/util/Random";

export class ShapeMachine extends Element {

  constructor() {
    super(0, 0, 0);
  }

  update(game: Game) {
    if(game.gameTime % 50 == 0) {
      let size = Random.nextNumber(20, 70);
      let shape = new ColoredShape(1500, Random.nextNumber(0, 300), Random.nextNumber(1, 1000), size, size, Random.nextColor());
      let speed = Random.nextNumber(1, 7);
      shape.addBehaviour("left", (game, shape) => {
        shape.move(speed * -1, 0);
        if(shape.x < 0) {
          game.gameArea.removeElement(shape);
        }
      });
      game.gameArea.addElement(shape);
    }
  }
}
