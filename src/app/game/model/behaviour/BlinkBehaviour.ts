import {Behaviour} from "./Behaviour";
import {Game} from "../../service/Game";
import {Position} from "../base/Position";
import {Element} from "../base/Element";

export class BlinkBehaviour implements Behaviour<Element> {
  private tempPosition: Position;
  private blink: boolean = false;
  private invisibleInterval: number;
  private visibleInterval: number;
  private lastBlink: number = 0;

  constructor(element: Element, gameTime: number, visibleInterval: number, invisibleInterval: number) {
    this.tempPosition = new Position(element.position.x, element.position.y);
    this.visibleInterval = visibleInterval;
    this.invisibleInterval = invisibleInterval;
    this.lastBlink = gameTime;
  }

  behaviour: (game: Game, shape: Element) => void = (game, element) => {
    if(this.blink) {
      element.setPosition(-5000, element.position.y);
      if(game.gameTime - this.lastBlink >= this.invisibleInterval) {
        this.lastBlink = game.gameTime;
        this.blink = false;
      }
    } else {
      element.setPosition(this.tempPosition.x, element.position.y);
      if(game.gameTime - this.lastBlink >= this.visibleInterval) {
        this.lastBlink = game.gameTime;
        this.blink = true
      }
    }
  }
}
