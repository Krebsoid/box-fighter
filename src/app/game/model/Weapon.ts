import { Element } from './Element';
import {Shape} from "./Shape";
import {Camera} from "./Camera";
import {Game} from "../service/Game";
import {Bullet} from "./Bullet";
import {Position} from "./Position";

export class Weapon extends Element{

  elements: Element[] = [];

  bulletHole: Position;
  target: Element;

  constructor(target: Element) {
    super(target.x + 50, target.y + 20, target.z);
    this.target = target;
    this.elements.push(new Shape(target.x+50, target.y+20, target.z, 30, 8, "#0206ee"));
    this.bulletHole = new Position(40, 3);
  }

  render(camera: Camera) {
    this.elements.forEach((value, index, array) => value.render(camera));
  }

  update(game: Game) {
    this.elements.forEach((value, index, array) => value.update(game));
    if(game.gameTime % 20 == 0 && game.controls.shoot) {
      game.gameArea.addElement(new Bullet(this));
    }
  }

  move(x: number, y: number) {
    this.bulletHole.move(x, y);
    this.elements.forEach((value, index, array) => value.move(x, y));
  }

}
