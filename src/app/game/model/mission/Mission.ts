import {Game} from "../../service/Game";
import {Element} from "../base/Element";
import {Camera} from "../base/Camera";
import {StrokedText} from "../base/StrokedText";
import {Position} from "../base/Position";
import {Shape} from "../base/Shape";

export class Mission {
  tasks: Map<number, Task>;
}

export abstract class Task extends Element {
  abstract description: string;
  done: boolean = false;

  abstract onSuccess: (game: Game) => void;
  abstract onFail: (game: Game) => void;

  type: string = "Task";
}

export class HitBoxes extends Task {
  constructor() {
    super(0,0,0);
    this.label = new StrokedText(10, 50, 0, "red", "30pt Calibri",0,"black").isFixed(true)
  }

  description: string = "Zerstöre alle roten Kisten aber keine grünen";
  fixed: boolean = true;
  label: StrokedText;

  onSuccess: (game: Game) => void = (game: Game) => {
    game.changeGameState("MAZE");
    this.done = true;
  };
  onFail: (game: Game) => void = (game: Game) => {
    game.changeGameState("DEAD");
    this.done = true;
  };

  render(camera: Camera): any {
    this.label.render(camera);
    super.render(camera);
  }

  update(game: Game) {
    if(!this.done) {
      let numberOfBoxesLeft = game.gameArea.elements.filter(value => value.key == "target").length;
      let numberOfNoTargetBoxes = game.gameArea.elements.filter(value => value.key == "no-target").length;
      this.label.text = this.description + "(" + numberOfBoxesLeft.toString() + " Kiste(n) übrig)";
      numberOfNoTargetBoxes < 1 ? this.onFail(game) : undefined;
      numberOfBoxesLeft == 0 ? this.onSuccess(game) : undefined;
    }
  }
}

export class EscapeMaze extends Task {
  fixed: boolean = true;
  label: StrokedText;
  target: Shape;

  constructor(target: Shape) {
    super(0,0,0);
    target.setKey("target");
    this.target = target;
    this.label = new StrokedText(100, 50, 100, "red", "30pt Calibri", 0, "black").isFixed(true);
    this.label.text = this.description;
  }

  description: string = "Entkomme aus dem Labyrinth und erreiche das Ende";
  onSuccess: (game: Game) => void = (game: Game) => {
    game.changeGameState("LEVEL2");
    this.done = true;
  };
  onFail: (game: Game) => void;

  render(camera: Camera): any {
    this.label.render(camera);
    super.render(camera);
  }

  update(game: Game) {
    if(!this.done && game.gameArea.getPlayer()) {
      let target = <Shape>game.gameArea.elements.filter(value => value.key == "target")[0];
      game.gameArea.getPlayer().hitboxes.some(value => value.collision(target)) ? this.onSuccess(game) : undefined;
    }
  }
}
