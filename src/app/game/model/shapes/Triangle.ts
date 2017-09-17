import {ShapeDescriptor} from "../base/shapes/ShapeDescriptor";
import {Position} from "../base/Position";

export class Triangle implements ShapeDescriptor {
  positions: Position[] = [
    new Position(50, 0),
    new Position(25, -50)
  ];
}
