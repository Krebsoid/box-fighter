import {Element} from "../../base/Element";
import {Game} from "../../../service/Game";
import {Camera} from "../../base/camera/Camera";
import {Shape} from "../../base/shapes/Shape";
import {Vector} from "../../base/Vector";
import {Player} from "../Player";

export abstract class Equipment extends Element {

  target: Element;
  elements: Shape[] = [];

  constructor(x: number, y: number, z: number) {
    super(x, y, z);
  }

  abstract attach(target: Player, slot: Vector);

  detach() {
    this.target = undefined;
  }

  isAttached() : boolean {
    return !!this.target;
  }

  isOnScreen(camera: Camera): boolean {
    return this.elements.some(shape => shape.isOnScreen(camera));
  }

  render(camera: Camera, canvas: string = "game") {
    this.elements.forEach(value => value.render(camera, canvas));
  }

  update(game: Game) {
    this.elements.forEach(value => value.update(game));
  }

  move(vector: Vector) {
    this.elements.forEach(value => value.move(vector));
  }

}
