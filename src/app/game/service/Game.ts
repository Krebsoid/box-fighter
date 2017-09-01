import {Injectable} from "@angular/core";
import {GameArea} from "./GameArea";
import {Controls} from "../model/base/Controls";
import {Scene} from "../model/base/Scene";
import {Event} from "../model/base/Event";
import {EventListener} from "../model/base/EventListener";
import {SceneType} from "../model/scene/SceneType";
import {Player} from "../model/base/Player";

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
  state: SceneType;
  scenes: Map<SceneType, Scene> = new Map();
  player: Player = new Player();
  events: Array<Event> = [];
  eventListeners: Array<EventListener> = [];
  gameTime: number;
  paused: boolean = false;

  controls: Controls = new Controls();

  constructor(public gameArea: GameArea) {

  }

  init() {
    const self = this;
    function main() {
      if(!self.paused) {
        self.gameArea.repaint();
        self.update();
        self.render();
        self.gameTime = GameTime.nextFrame();
      }
      requestAnimationFrame(main);
    }
    main();
  }

  changeGameState(newGameState: SceneType, delay: number = 0) {
    let oldState: SceneType = this.state;
    this.state = newGameState;
    if(oldState !== newGameState) {
      let self = this;
      setTimeout(function() {
        oldState ? self.scenes.get(oldState).cleanUp(self) : undefined;
        self.scenes.get(newGameState).init(self);
        self.resume();
      }, delay || 1000);
    }
  }

  getActiveScene() : Scene {
    return this.scenes.get(this.state);
  }

  addEvent(event: Event) {
    this.events.push(event);
    this.eventListeners.forEach(eventListener => eventListener.onEvent(event))
  }

  registerEventListener(eventListener: EventListener) {
    this.eventListeners.push(eventListener);
  }

  update() {
    this.gameArea.elements.forEach(element => element.update(this))
  }

  pause() {
    this.paused = true;
  }

  resume() {
    this.paused = false;
  }

  render() {
    this.gameArea.elementsOnCamera()
      .sort((a, b) => a.z - b.z)
      .forEach(element => element.render(this.gameArea.camera));
  }
}
