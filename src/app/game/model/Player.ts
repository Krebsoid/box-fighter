import { Element } from './Element';
import {Shape} from "./Shape";
import {Camera} from "./Camera";
import {Game} from "../service/Game";

export class Player extends Element{

  elements: Element[] = [];

  constructor() {
    super(100, 500/2 - 25, 5);
    this.elements.push(new Shape(this.x, this.y, this.z, 25, 25, "#234242"));
    this.elements.push(new Shape(this.x+25, this.y, this.z, 25, 25, "#29ee4c"));
    this.elements.push(new Shape(this.x+25, this.y+25, this.z, 25, 25, "#234242"));
    this.elements.push(new Shape(this.x, this.y+25, this.z, 25, 25, "#29ee4c"));
  }

  render(camera: Camera) {
    this.elements.forEach((value, index, array) => value.render(camera));
  }

  setElement(element: Element) {
    this.elements.push(element);
  }

  update(game: Game) {
    this.elements.forEach((value, index, array) => value.update(game));
    if(game.controls.down) {
      if(this.y <= 450) {
        this.move(0, 1);
        this.elements.forEach((value, index, array) => value.move(0, 1));
      }
    }
    if(game.controls.up) {
      if(this.y >= 0) {
        this.move(0, -1);
        this.elements.forEach((value, index, array) => value.move(0, -1));
      }
    }
    if(game.controls.right) {
      this.move(1, 0);
      this.elements.forEach((value, index, array) => value.move(1, 0));
    }
    if(game.controls.left) {
      this.move(-1, 0);
      this.elements.forEach((value, index, array) => value.move(-1, 0));
    }
  }

}
