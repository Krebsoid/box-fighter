import {Scene} from "../base/Scene";
import {Game} from "../../service/Game";
import {ColoredShape} from "../base/ColoredShape";
import {CurrencyMeter} from "../ui/CurrencyMeter";
import {FuelMeter} from "../ui/FuelMeter";
import {PathBehaviour} from "../behaviour/PathBehaviour";
import {Shape} from "../base/Shape";
import {BasicCamera} from "../base/BasicCamera";
import {SceneType} from "./SceneType";
import {ShrinkingColoredShape} from "../base/ShrinkingColoredShape";
import {WeaponMeter} from "../ui/WeaponMeter";
import {Text} from "../base/Text";
import {StrokedText} from "../base/StrokedText";
import {Task} from "../mission/Mission";
import {Camera} from "../base/Camera";
import {StaticCamera} from "../base/StaticCamera";
import {BlinkBehaviour} from "../behaviour/BlinkBehaviour";
import {Vector} from "../base/Vector";
import {LifeMeter} from "../ui/LifeMeter";

export class Maze extends Scene {
  hasBackground: boolean = true;
  name: string = "Maze";
  type: SceneType = SceneType.MAZE;
  levelBorders: Shape = new Shape(0, 0, 0, 500, 3000);

  playground(game: Game) {
    let player = game.player;
    player.lifes = 3;
    player.resetPosition(100, 500/2 - 25, 5);
    game.gameArea.addElement(player);

    let camera = new BasicCamera(player, game.gameArea);
    game.gameArea.setCamera(camera);

    game.gameArea.addElement(new ColoredShape(500, 0, 1, 200, 50, "black"));
    game.gameArea.addElement(new ColoredShape(500, 300, 1, 250, 50, "black"));

    game.gameArea.addElement(new ColoredShape(700, 100, 1, 300, 550, "black"));
    game.gameArea.addElement(new ColoredShape(750, 150, 2, 200, 450, "cyan"));

    game.gameArea.addElement(new ColoredShape(1400, 0, 1, 200, 50, "black"));
    game.gameArea.addElement(new ColoredShape(1400, 300, 1, 250, 50, "black"));
    let target = new ColoredShape(1485, 200, 1, 100, 5, "white").isDangerous(false);
    game.gameArea.addElement(target);
    game.gameArea.addElement(new EscapeMaze(target));

    let dangerousShape1 = new ShrinkingColoredShape(1250, 350, 5, 100, 100, "red").isDestructible(true).setLife(30).setValue(800);
    let dangerousShape2 = new ShrinkingColoredShape(600, 0, 5, 100, 100, "red").isDestructible(true).setLife(30).setValue(800);
    let pathBehaviour = new PathBehaviour(2, [
      (game: Game) => new Vector(1250, 0),
      (game: Game) => new Vector(600, 0),
      (game: Game) => new Vector(600, 400),
      (game: Game) => new Vector(1250, 400)
    ]);
    let pathBehaviour2 = new PathBehaviour(2, [
      (game: Game) => new Vector(600, 400),
      (game: Game) => new Vector(1250, 400),
      (game: Game) => new Vector(1250, 0),
      (game: Game) => new Vector(600, 0)
    ]);
    dangerousShape1.addGenericBehaviour<ColoredShape>("path", pathBehaviour);
    dangerousShape2.addGenericBehaviour<ColoredShape>("path", pathBehaviour2);

    let textUp = new Text(107, 180, 2, "black", "30pt Calibri");
    textUp.text = "↑ W";
    game.gameArea.addElement(textUp);
    let textDown = new Text(107, 340, 2, "black", "30pt Calibri");
    textDown.text = "↓ S";
    game.gameArea.addElement(textDown);
    let textRight = new Text(220, 261, 2, "black", "30pt Calibri");
    textRight.text = "→ D";
    game.gameArea.addElement(textRight);
    let textLeft = new Text(-20, 260, 2, "black", "30pt Calibri");
    textLeft.text = "← A";
    game.gameArea.addElement(textLeft);

    game.gameArea.addElement(dangerousShape1);
    game.gameArea.addElement(dangerousShape2);

    game.gameArea.addElement(new LifeMeter(player));
    game.gameArea.addElement(new WeaponMeter(player));
    game.gameArea.addElement(new FuelMeter(player));
    game.gameArea.addElement(new CurrencyMeter(player));
  }
}

export class EscapeMaze extends Task {
  label: StrokedText;
  target: Shape;

  constructor(target: Shape) {
    super();
    target.setKey("target");
    this.target = target;
    this.label = new StrokedText(100, 50, 100, "red", "30pt Calibri", 0, "black").isFixed(true);
    this.label.text = this.description;
  }

  description: string = "Entkomme aus dem Labyrinth und erreiche das Ende";
  onSuccess: (game: Game) => void = (game: Game) => {
    game.pause();
    game.changeGameState(SceneType.LEVEL1_INTRO);
    this.done = true;
  };

  labelRendered: boolean = false;
  render(camera: Camera): any {
    if(!this.labelRendered) {
      this.label.render(camera, "static");
      this.labelRendered = true;
    }
    super.render(camera);
  }

  update(game: Game) {
    if(!this.done && game.gameArea.getPlayer()) {
      let target = <Shape>game.gameArea.elements.filter(value => value.key == "target")[0];
      game.gameArea.getPlayer().hitboxes.some(value => value.collision(target)) ? this.onSuccess(game) : undefined;
    }
  }
}

export class MazeIntro extends Scene {
  hasBackground: boolean = false;
  name: string = "Maze Intro";
  type: SceneType = SceneType.MAZE_INTRO;
  levelBorders: Shape = new Shape(0, 0, 0, 500, 3000);

  playground(game: Game) {
    game.gameArea.setCamera(new StaticCamera(game.gameArea));
    let text = new Text(300, 160, 1, "blue", "80pt Calibri").isFixed(true);
    text.text = "Level 1";
    game.gameArea.addElement(text);
    let text2 = new Text(310, 260, 1, "blue", "40pt Calibri").isFixed(true);
    text2.text = "Lerne Fliegen!";
    game.gameArea.addElement(text2);
    let text3 = new Text(310, 360, 1, "black", "20pt Calibri").isFixed(true);
    text3.text = "Drück LEERTASTE zum Starten";
    text3.addGenericBehaviour("blink", new BlinkBehaviour(text3, game.gameTime, 50, 10));
    game.gameArea.addElement(text3);

    let spaceTask = new SpaceTask();
    game.gameArea.addElement(spaceTask);
  }
}

export class SpaceTask extends Task {
  onSuccess: (game: Game) => void = game => {
    game.pause();
    game.changeGameState(SceneType.MAZE, 500);
  };

  update(game: Game) {
    if(game.controls.shoot) {
      this.onSuccess(game);
    }
  }
}
