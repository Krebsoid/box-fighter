import {Scene} from "../base/Scene";
import {Game} from "../../service/Game";
import {Engine} from "../parts/Engine";
import {Weapon} from "../parts/Weapon";
import {Player} from "../base/Player";
import {ColoredShape} from "../base/ColoredShape";
import {HitBox} from "../HitBox";
import {Sprite} from "../base/Sprite";
import {FuelMeter} from "../ui/FuelMeter";
import {Fuel} from "../Fuel";
import {Shape} from "../base/Shape";
import {GenericShape} from "../base/GenericShape";
import {Triangle} from "../shapes/Triangle";
import {Heart} from "../shapes/Heart";
import {ShapeMachine} from "../ShapeMachine";
import {CircleBehaviour} from "../behaviour/CircleBehaviour";
import {SinusBehaviour} from "../behaviour/SinusBehaviour";
import {StrokedText} from "../base/StrokedText";
import {CurrencyMeter} from "../ui/CurrencyMeter";
import {DoubleWeapon} from "../parts/DoubleWeapon";
import {BasicCamera} from "../base/BasicCamera";

export class GameScene extends Scene {
  name: string = "Game";
  gameState: string = 'LEVEL2';
  levelBorders: Shape = new Shape(0, 0, 0, 500, 3000);

  init(game: Game) {
    let player = new Player();
    player.setWeapon(new Weapon(0,0,0));
    player.setEngine(new Engine(0,0,0));
    game.gameArea.addElement(player);

    let newWeapon = new DoubleWeapon(200,400,10);
    game.gameArea.addElement(newWeapon);

    let camera = new BasicCamera(player, game.gameArea);
    game.gameArea.setCamera(camera);

    let shape = new ColoredShape(50, 50, 1, 50, 50, "#00ff16").isDestructible(true);
    shape.addBehaviour<Shape>("little-forward", (game, shape) => {
      if(game.gameTime > 300) {
        shape.move(3,0);
      }
    });
    shape.addBehaviour<Shape>("fast-backward", (game, shape) => {
      if(game.gameTime > 1000) {
        shape.removeBehaviour("little-forward");
        shape.move(-10,0);
      }
    });
    game.gameArea.addElement(shape);

    let shape2 = new ColoredShape(300, 100, 1, 50, 50, "#0002ff").isDestructible(true);
    shape2.addBehaviour<Shape>("sinus-freak", (game, shape) => {
      if(game.gameTime > 100) {
        shape.move(2, 6 * Math.sin(shape.x/10));
      }
    });
    game.gameArea.addElement(shape2);
    game.gameArea.addElement(new ColoredShape(800, 100, 1, 50, 50, "#ff000f").isDestructible(true));
    let coloredShape = new ColoredShape(2000, 100, 1, 50, 50, "#fff300").isDestructible(true);
    game.gameArea.addElement(coloredShape);
    game.gameArea.addElement(new ColoredShape(3000, 0, 3, 2, 500, "#000000").isDestructible(true));

    game.gameArea.addElement(new HitBox(100, 100, 3, 100, 100, "#98ffb7").isDestructible(true));

    game.gameArea.addElement(new Sprite(500, 200, 1, 30, 30, true, 200, "assets/sprite.png").isDestructible(true));
    let sprite = new Sprite(500, 300, 1, 30, 30, true, 6, "assets/sprite.png");
    sprite.addGenericBehaviour<Shape>("sinus-freak", new SinusBehaviour());
    sprite.addBehaviour<Shape>("sinus-freak-backwards", (game, shape) => {
      if(shape.x > 700) {
        shape.removeBehaviour("sinus-freak");
      }
      if(shape.x > 500 && !shape.behaviours.has("sinus-freak")) {
        shape.move(-2, 2 * Math.sin(shape.x/5));
      } else {
        shape.addBehaviour<Shape>("sinus-freak", (game, shape) => {
          if(shape.x < 700) {
            shape.move(.4, 2 * Math.sin(shape.x/5));
          }
        });
      }
    });
    game.gameArea.addElement(sprite);

    let sprite2 = new Sprite(500, 250, 1, 30, 30, true, 200, "assets/sprite.png").isDestructible(true);

    sprite2.addGenericBehaviour<Sprite>("circle", new CircleBehaviour(200));

    game.gameArea.addElement(sprite2);
    game.gameArea.addElement(new ColoredShape(500, 250, 2, 2, 2, "#000000").isDestructible(true));
    game.gameArea.addElement(new ShapeMachine());

    game.gameArea.addElement(new Fuel(300, 300, 300));
    game.gameArea.addElement(new Fuel(1000, 300, 300));
    game.gameArea.addElement(new FuelMeter(player));
    game.gameArea.addElement(new CurrencyMeter(player));

    game.gameArea.addElement(new GenericShape(500, 320, 10, "green", new Triangle()));

    let heart = new GenericShape(700, 320, 10, "red", new Heart());
    heart.addGenericBehaviour<Shape>("circle", new CircleBehaviour(100));
    game.gameArea.addElement(heart);

    let staticTextWithStroke = new StrokedText(100, 60, 20, "green", "30pt Calibri", 3, "black");
    staticTextWithStroke.text = "Hallo, am besten hol dir erstmal die Doppel-Wumme";
    game.gameArea.addElement(staticTextWithStroke);
  }
}
