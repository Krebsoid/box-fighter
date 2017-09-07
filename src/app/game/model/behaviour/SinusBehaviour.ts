import {Behaviour} from "./Behaviour";
import {Game} from "../../service/Game";
import {Shape} from "../base/Shape";
import {Vector} from "../base/Vector";

export class SinusBehaviour implements Behaviour<Shape> {
  behaviour: (game: Game, shape: Shape) => void = (game, shape) => {
    if(shape.position.x < 1000) {
      shape.move(new Vector(.4, 2 * Math.sin(shape.position.x/5)));
    }
  }
}
