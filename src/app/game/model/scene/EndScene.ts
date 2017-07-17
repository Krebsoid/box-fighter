import {Scene} from "../Scene";
import {Game} from "../../service/Game";
import {Text} from "../Text";

export class EndScene extends Scene {

  gameState: string = 'DEAD';

  init(game: Game) {
    let text = new Text(200, 200, 1, "#000", "80pt Calibri");
    text.text = "Spiel ist vorbei!";
    game.gameArea.addElement(text);
  }
}
