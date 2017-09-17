import {Injectable} from "@angular/core";
import {GameArea} from "./GameArea";
import {Controls} from "../model/player/Controls";
import {Event} from "../model/base/event/Event";
import {EventListener} from "../model/base/event/EventListener";
import {Player} from "../model/player/Player";
import {Scene} from "../model/base/Scene";
import {SceneCatalogue} from "../model/catalogues/SceneCatalogue";

export class GameTime {
  static frames: number = 0;
  static nextFrame() {
    return GameTime.frames++;
  }
  static frame() {
    return GameTime.frames;
  }
  static reset() {
    GameTime.frames = 0;
  }
}

@Injectable()
export class Game {
  state: SceneCatalogue;
  scenes: Map<SceneCatalogue, Scene> = new Map();
  player: Player = new Player();
  events: Array<Event> = [];
  eventListeners: Array<EventListener> = [];
  gameTime: number;
  paused: boolean = true;

  controls: Controls = new Controls();

  constructor(public gameArea: GameArea) {

  }

  init() {
    const self = this;
    function main() {
      if(!self.paused) {
        self.gameArea.repaint("game");
        self.update();
        self.render();
        self.gameTime = GameTime.nextFrame();
      }
      requestAnimationFrame(main);
    }
    main();
  }

  changeGameState(newGameState: SceneCatalogue, delay: number = 0) {
    let oldState: SceneCatalogue = this.state;
    this.player.lastScene = this.state;
    if(oldState !== newGameState) {
      let self = this;
      setTimeout(function() {
        GameTime.reset();
        self.state = newGameState;
        self.pause();
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
