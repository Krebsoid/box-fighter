import {Element} from "./Element";
import {Game, Random} from "../service/Game";
import {ColoredShape} from "./ColoredShape";

export class ShapeMachine extends Element {

  constructor() {
    super(0, 0, 0);
  }

  update(game: Game) {
    if(game.gameTime % 50 == 0) {
      let shape = new ColoredShape(1500, Random.nextNumber(0, 300), 5, 50, 50, Random.nextColor());
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
