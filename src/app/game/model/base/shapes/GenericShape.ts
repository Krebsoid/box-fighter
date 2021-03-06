import {Camera} from "../camera/Camera";
import {Position} from "../Position";
import {ShapeDescriptor} from "./ShapeDescriptor";
import {Shape} from "./Shape";
import {ElementCatalogue} from "../../catalogues/ElementCatalogue";

export class GenericShape extends Shape {

  descriptor: Position[] = [];
  color: string;

  constructor(x: number, y: number, z: number, color: string, descriptor: ShapeDescriptor) {
    super(x, y, z, 0, 0);
    this.color = color;
    this.descriptor = descriptor.positions;
  }

  isOnScreen(camera: Camera): boolean {
    return this.descriptor.some(position => camera.shape().containsPosition(new Position(this.position.x + camera.xOffset + position.x, this.position.y + camera.yOffset + position.y)));
  }

  render(camera: Camera, canvas: string = "game") {
    super.render(camera, canvas);
    let context = camera.gameArea.getContext(canvas);
    context.fillStyle = this.color;
    context.beginPath();
    context.moveTo(this.xOffset, this.yOffset);
    this.descriptor.forEach(position => context.lineTo(this.xOffset + position.x, this.yOffset + position.y));
    context.fill();
  }

  type: ElementCatalogue = ElementCatalogue.GENERIC_SHAPE;
}
