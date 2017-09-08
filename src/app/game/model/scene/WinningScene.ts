import {Scene} from "../base/Scene";
import {Game} from "../../service/Game";
import {Text} from "../base/Text";
import {StaticCamera} from "../base/StaticCamera";
import {Shape} from "../base/Shape";
import {SceneType} from "./SceneType";

export class WinningScene extends Scene {
  hasBackground: boolean = false;
  name: string = "Win";
  type: SceneType = SceneType.WIN;
  levelBorders: Shape = new Shape(0, 0, 0, 500, 1024);

  playground(game: Game) {
    game.gameArea.setCamera(new StaticCamera(game.gameArea));
    let text = new Text(90, 200, 1, "#000", "80pt Calibri");
    text.text = "Du hast gewonnen!";
    game.gameArea.addElement(text);
  }
}
