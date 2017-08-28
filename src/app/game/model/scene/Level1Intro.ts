import {Scene} from "../base/Scene";
import {Game} from "../../service/Game";
import {Shape} from "../base/Shape";
import {SceneType} from "./SceneType";
import {Text} from "../base/Text";
import {StaticCamera} from "../base/StaticCamera";
import {Task} from "../mission/Mission";
import {BlinkBehaviour} from "../behaviour/BlinkBehaviour";

export class Level1Intro extends Scene {
  name: string = "Level1 Intro";
  type: SceneType = SceneType.LEVEL1_INTRO;
  levelBorders: Shape = new Shape(0, 0, 0, 500, 3000);

  init(game: Game) {
    game.gameArea.setCamera(new StaticCamera(game.gameArea));
    let text = new Text(300, 160, 1, "blue", "80pt Calibri").isFixed(true);
    text.text = "Level 1";
    game.gameArea.addElement(text);
    let text2 = new Text(310, 260, 1, "blue", "40pt Calibri").isFixed(true);
    text2.text = "Learn to fly!";
    game.gameArea.addElement(text2);
    let text3 = new Text(310, 360, 1, "black", "20pt Calibri").isFixed(true);
    text3.text = "Press SPACE to continue";
    text3.addGenericBehaviour("blink", new BlinkBehaviour(text3, game.gameTime, 50, 10));
    game.gameArea.addElement(text3);

    let spaceTask = new SpaceTask();
    game.gameArea.addElement(spaceTask);
  }
}

export class SpaceTask extends Task {
  onSuccess: (game: Game) => void = game => game.changeGameState(SceneType.LEVEL1);

  update(game: Game) {
    if(game.controls.shoot) {
      this.onSuccess(game);
    }
  }
}
