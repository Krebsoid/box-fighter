import {Behaviour} from "../base/Behaviour";
import {Game} from "../../service/Game";
import {Element} from "../base/Element";

export class FollowBehaviour implements Behaviour<Element> {
  target: Element;
  speed: number;

  constructor(target: Element, speed: number) {
    this.target = target;
    this.speed = speed;
  }

  behaviour: (game: Game, shape: Element) => void = (game, shape) => {
    shape.setDestination(this.target.position);
    shape.moveTo(this.speed);
  }
}
