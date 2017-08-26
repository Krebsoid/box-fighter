import {Shape} from "./Shape";

export class Event {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export class KillEvent extends Event {
  object: Shape;

  constructor(object: Shape) {
    super("");
    this.object = object;
  }
}
