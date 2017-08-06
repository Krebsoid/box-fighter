import {Camera} from "./Camera";
import {Position} from "./Position";
import {ShapeDescriptor} from "../shapes/ShapeDescriptor";
import {Shape} from "./Shape";

export class GenericShape extends Shape {

  descriptor: Position[] = [];
  color: string;

  constructor(x: number, y: number, z: number, color: string, descriptor: ShapeDescriptor) {
    super(x, y, z, 0, 0);
    this.color = color;
    this.descriptor = descriptor.positions;
  }

  render(camera: Camera) {
    super.render(camera);
    let context = camera.gameArea.getContext();
    context.fillStyle = this.color;
    context.beginPath();
    context.moveTo(this.xOffset, this.yOffset);
    this.descriptor.forEach(position => context.lineTo(this.xOffset + position.x, this.yOffset + position.y));
    context.fill();
  }
}