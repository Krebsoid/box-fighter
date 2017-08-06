import {Behaviour} from "./Behaviour";
import {Game} from "../../service/Game";
import {Shape} from "../base/Shape";

export class SinusBehaviour implements Behaviour<Shape> {
  behaviour: (game: Game, shape: Shape) => void = (game, shape) => {
    if(shape.x < 1000) {
      shape.move(.4, 2 * Math.sin(shape.x/5));
    }
  }
}
