import {Scene} from "../base/Scene";
import {Game} from "../../service/Game";
import {Text} from "../base/Text";
import {StaticCamera} from "../base/StaticCamera";
import {Shape} from "../base/Shape";

export class EndScene extends Scene {
  name: string = "End";
  gameState: string = 'DEAD';
  levelBorders: Shape = new Shape(0, 0, 0, 500, 1024);

  init(game: Game) {
    game.gameArea.setCamera(new StaticCamera(game.gameArea));
    let text = new Text(240, 280, 1, "red", "80pt Calibri").isFixed(true);
    text.text = "YOU DIED!";
    game.gameArea.addElement(text);
  }
}
