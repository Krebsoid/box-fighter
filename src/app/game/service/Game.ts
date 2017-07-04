import {HostListener, Injectable} from "@angular/core";
import { GameArea } from "./GameArea";
import {Controls} from "../model/Controls";

@Injectable()
export class Game {
  state: string = 'READY';
  frameRate: number;
  gameTime: number = 0;

  controls: Controls = new Controls();

  constructor(public  gameArea: GameArea) {

  }

  init() {
    const self = this;
    function main() {
      self.gameArea.repaint();
      self.update();
      self.render();
      self.gameTime += 1;
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
