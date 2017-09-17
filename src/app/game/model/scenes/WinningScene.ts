import {Scene} from "../base/Scene";
import {Game} from "../../service/Game";
import {Text} from "../base/text/Text";
import {StaticCamera} from "../base/camera/StaticCamera";
import {Shape} from "../base/shapes/Shape";
import {SceneCatalogue} from "../catalogues/SceneCatalogue";

export class WinningScene extends Scene {
  hasBackground: boolean = false;
  name: string = "Win";
  type: SceneCatalogue = SceneCatalogue.WIN;
  levelBorders: Shape = new Shape(0, 0, 0, 500, 1024);

  playground(game: Game) {
    game.gameArea.setCamera(new StaticCamera(game.gameArea));
    let text = new Text(90, 200, 1, "#000", "80pt Calibri");
    text.text = "Du hast gewonnen!";
    game.gameArea.addElement(text);
  }
}
