import {Injectable} from "@angular/core";
import { GameArea } from "./GameArea";
import {Controls} from "../model/Controls";
import {Scene} from "../model/Scene";

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
  state: string;
  scenes: Scene[] = [];
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

  changeGameState(newGameState: string, delay: number = 0) {
    let oldState: string = this.state;
    this.state = newGameState;
    if(oldState !== newGameState) {
      let self = this;
      setTimeout(function() {
        self.scenes.forEach((value) => value.onGameStateChange(oldState, self));
      }, delay);
    }
  }

  update() {
    this.gameArea.elements.forEach(element => element.update(this))
  }

  render() {
    this.gameArea.elements.sort((a, b) => a.z - b.z).forEach(element => element.render(this.gameArea.camera));
  }
}
