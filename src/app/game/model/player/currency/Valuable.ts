export interface Valuable {
  value: number;
  setValue<SHAPE>(value: number): SHAPE;
}
