import {Injectable} from "@angular/core";
import { GameArea } from "./GameArea";
import {Controls} from "../model/Controls";

export class Random {
  static nextNumber(x: number, y: number) {
    return Math.floor((Math.random()*y)+x);
  }
  static nextColor() {
    return '#' + (function co(lor){   return (lor +=
        [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)])
      && (lor.length == 6) ?  lor : co(lor); })('');
  }
}

export class GameTime {
  static frames: number = 0;
  static nextFrame() {
    return GameTime.frames++;
  }
  static frame() {
    return GameTime.frames;
  }
}

@Injectable()
export class Game {
  state: string = 'READY';
  gameTime: number;

  controls: Controls = new Controls();

  constructor(public gameArea: GameArea) {

  }

  init() {
    const self = this;
    function main() {
      self.gameArea.repaint();
      self.update();
      self.render();
      self.gameTime = GameTime.nextFrame();
      requestAnimationFrame(main);
    }
    main();
  }

  update() {
    this.gameArea.elements.forEach(element => element.update(this))
  }

  render() {
    this.gameArea.elements.sort((a, b) => a.z - b.z).forEach(element => element.render(this.gameArea.camera));
  }
}
