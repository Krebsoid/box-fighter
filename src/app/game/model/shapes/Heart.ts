import {ShapeDescriptor} from "../base/shapes/ShapeDescriptor";
import {Position} from "../base/Position";

export class Heart implements ShapeDescriptor {
  positions: Position[] = [
    new Position(20, -35),
    new Position(50, -35),
    new Position(60, -15),
    new Position(70, -35),
    new Position(100, -35),
    new Position(120, 0),
    new Position(60, 70)
  ];
}
