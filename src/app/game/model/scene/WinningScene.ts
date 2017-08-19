import {Scene} from "../base/Scene";
import {Game} from "../../service/Game";
import {Text} from "../base/Text";

export class WinningScene extends Scene {
  name: string = "Win";
  gameState: string = 'WIN';

  init(game: Game) {
    let text = new Text(40, 200, 1, "#000", "80pt Calibri");
    text.text = "Du hast gewonnen!";
    game.gameArea.addElement(text);
    game.gameArea.camera.setPosition(0, 0);
  }
}
