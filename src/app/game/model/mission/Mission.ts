import {Game} from "../../service/Game";
import {Element} from "../base/Element";
import {Camera} from "../base/Camera";
import {StrokedText} from "../base/StrokedText";

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
    this.isFixed(true);
    this.label = new StrokedText(200, 50, 0, "red", "30pt Calibri",0,"black").isFixed(true)
  }

  description: string = "Hit all red boxes but no green";

  label: StrokedText;

  onSuccess: (game: Game) => void = (game: Game) => {
    game.changeGameState("LEVEL2");
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
      this.label.text = this.description + "(" + numberOfBoxesLeft.toString() + " boxes left)";
      numberOfNoTargetBoxes < 1 ? this.onFail(game) : undefined;
      numberOfBoxesLeft == 0 ? this.onSuccess(game) : undefined;
    }
  }
}
