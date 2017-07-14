import {Component, HostListener, OnInit} from '@angular/core';
import {GameArea} from "./service/GameArea";
import {Game} from "./service/Game";
import {Player} from "./model/Player";
import {Camera} from "./model/Camera";
import {Weapon} from "./model/Weapon";
import {HitBox} from "./model/HitBox";
import {Engine} from "./model/parts/engine/Engine";
import {Sprite} from "./model/Sprite";
import {ColoredShape} from "./model/ColoredShape";
import {ShapeMachine} from "./model/ShapeMachine";

@Component({
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(public gameArea: GameArea, public game: Game) {

  }

  ngOnInit(): void {
    let player = new Player();
    player.setWeapon(new Weapon(player));
    player.setEngine(new Engine(player));
    this.gameArea.addElement(player);

    let camera = new Camera(player, this.gameArea);
    this.gameArea.setCamera(camera);

    let shape = new ColoredShape(50, 50, 1, 50, 50, "#00ff16");
    shape.addBehaviour("little-forward", (game, shape) => {
      if(game.gameTime > 300) {
        shape.move(3,0);
      }
    });
    shape.addBehaviour("fast-backward", (game, shape) => {
      if(game.gameTime > 1000) {
        shape.removeBehaviour("little-forward");
        shape.move(-10,0);
      }
    });
    this.gameArea.addElement(shape);

    let shape2 = new ColoredShape(300, 100, 1, 50, 50, "#0002ff");
    shape2.addBehaviour("sinus-freak", (game, shape) => {
      if(game.gameTime > 100) {
        shape.move(2, 6 * Math.sin(shape.x/10));
      }
    });
    this.gameArea.addElement(shape2);
    this.gameArea.addElement(new ColoredShape(800, 100, 1, 50, 50, "#ff000f"));
    let coloredShape = new ColoredShape(2000, 100, 1, 50, 50, "#fff300");
    this.gameArea.addElement(coloredShape);
    this.gameArea.addElement(new ColoredShape(3000, 0, 3, 2, 500, "#000000"));

    this.gameArea.addElement(new HitBox(100, 100, 3, 100, 100, "#98ffb7"));

    this.gameArea.addElement(new Sprite(500, 200, 1, 30, 30, true, 200, "assets/sprite.png"));
    let sprite = new Sprite(500, 300, 1, 30, 30, true, 6, "assets/sprite.png");
    sprite.addBehaviour("sinus-freak", (game, shape) => {
      if(shape.x < 1000) {
        shape.move(.4, 2 * Math.sin(shape.x/5));
      }
    });
    sprite.addBehaviour("sinus-freak-backwards", (game, shape) => {
      if(shape.x > 700) {
        shape.removeBehaviour("sinus-freak");
      }
      if(shape.x > 500 && !shape.behaviours.has("sinus-freak")) {
        shape.move(-2, 2 * Math.sin(shape.x/5));
      } else {
        shape.addBehaviour("sinus-freak", (game, shape) => {
          if(shape.x < 700) {
            shape.move(.4, 2 * Math.sin(shape.x/5));
          }
        });
      }
    });
    this.gameArea.addElement(sprite);

    let sprite2 = new Sprite(500, 250, 1, 30, 30, true, 200, "assets/sprite.png");
    let angle = Math.PI / 180;
    let radius = 200;
    sprite2.addBehaviour("circle", (game, shape) => {
        angle += Math.PI / 180;
        let x = 500 + radius * (Math.cos(angle));
        let y = 250 + radius * (Math.sin(angle));
        shape.setPosition(x, y);
    });
    this.gameArea.addElement(sprite2);
    this.gameArea.addElement(new ColoredShape(500, 250, 2, 2, 2, "#000000"));

    this.gameArea.addElement(new ShapeMachine());

    this.game.init();
  }

  @HostListener('document:keydown', ['$event'])
  playerMovement(event: KeyboardEvent) {
    this.game.controls.addControl(event.key);
  }

  private lastX: number = 100;
  private lastY: number = 255;
  private touched: boolean = false;
  @HostListener('mousemove', ['$event'])
  @HostListener('touchmove', ['$event'])
  onMousemove(event) {
    let clientY = event.touches ? event.touches[0].clientY : event.clientY;
    let clientX = event.touches ? event.touches[0].clientX : event.clientX;
    if(this.touched) {
      if(this.lastX < clientX) {
        this.game.controls.addControl("d");
        this.game.controls.removeControl("a");
      } else {
        this.game.controls.addControl("a");
        this.game.controls.removeControl("d");
      }
    }
    if(this.touched) {
      if(this.lastY < clientY) {
        this.game.controls.addControl("s");
        this.game.controls.removeControl("w");
      } else {
        this.game.controls.addControl("w");
        this.game.controls.removeControl("s");
      }
    }
    this.lastX = clientX;
    this.lastY = clientY;
  }

  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  onMousedown(event) {
    this.touched = true;
    this.game.controls.addControl(" ");
  }

  @HostListener('mouseup')
  @HostListener('touchend', ['$event'])
  @HostListener('touchcancel', ['$event'])
  onMouseup() {
    this.touched = false;
    this.game.controls.removeControl(" ");
    this.game.controls.removeControl("w");
    this.game.controls.removeControl("s");
    this.game.controls.removeControl("a");
    this.game.controls.removeControl("d");
  }

  @HostListener('document:keyup', ['$event'])
  movementStop(event: KeyboardEvent) {
    this.game.controls.removeControl(event.key);
  }
}
