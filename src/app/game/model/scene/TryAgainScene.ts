import {Scene} from "../base/Scene";
import {Game} from "../../service/Game";
import {Text} from "../base/Text";
import {StaticCamera} from "../base/StaticCamera";
import {Shape} from "../base/Shape";
import {SceneType} from "./SceneType";
import {Task} from "../mission/Mission";
import {BlinkBehaviour} from "../behaviour/BlinkBehaviour";

export class TryAgainScene extends Scene {
  hasBackground: boolean = false;
  name: string = "End";
  type: SceneType = SceneType.TRY_AGAIN;
  levelBorders: Shape = new Shape(0, 0, 0, 500, 1024);

  playground(game: Game) {
    game.gameArea.setCamera(new StaticCamera(game.gameArea));
    let text = new Text(250, 260, 1, "red", "80pt Calibri").isFixed(true);
    text.text = "YOU DIED!";
    game.gameArea.addElement(text);

    let text3 = new Text(250, 360, 1, "black", "20pt Calibri").isFixed(true);
    text3.text = "Drücke LEERTASTE für einen neuen Versuch";
    text3.addGenericBehaviour("blink", new BlinkBehaviour(text3, game.gameTime, 50, 10));
    game.gameArea.addElement(text3);

    let spaceTask = new SpaceTask();
    game.gameArea.addElement(spaceTask);
  }
}

export class SpaceTask extends Task {
  onSuccess: (game: Game) => void = game => game.changeGameState(game.player.lastScene, 500);

  update(game: Game) {
    if(game.controls.shoot) {
      game.pause();
      this.onSuccess(game);
    }
  }
}
