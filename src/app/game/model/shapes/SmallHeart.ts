import {ShapeDescriptor} from "../base/shapes/ShapeDescriptor";
import {Position} from "../base/Position";

export class SmallHeart implements ShapeDescriptor {
  positions: Position[] = [
    new Position(4, -7),
    new Position(10, -7),
    new Position(12, -3),
    new Position(14, -7),
    new Position(20, -7),
    new Position(24, 0),
    new Position(12, 14)
  ];
}
