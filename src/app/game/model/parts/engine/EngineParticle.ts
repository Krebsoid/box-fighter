import {Engine} from "./Engine";
import {Camera} from "../../Camera";
import {Game} from "../../../service/Game";
import {ColoredShape} from "../../ColoredShape";

export class EngineParticle extends ColoredShape {

  maxRange: number = 50;
  speed: number = 5;
  travelled: number = 0;
  direction: number;

  constructor(engine: Engine, color: string) {
    super(engine.engineHole.x, engine.engineHole.y, engine.z, 10, 2, color);
    let num = Math.floor(Math.random() * 1000) + 1;
    num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    this.direction = num / 500;
  }

  render(camera: Camera) {
    super.render(camera);
  }

  update(game: Game) {
    if(this.maxRange <= this.travelled) {
      game.gameArea.removeElement(this);
    }

    this.move(-this.speed, this.direction);
    this.travelled += this.speed;
  }

}

