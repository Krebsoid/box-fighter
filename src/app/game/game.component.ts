import {Component, HostListener, OnInit} from '@angular/core';
import {Shape} from "./model/Shape";
import {GameArea} from "./service/GameArea";
import {Game} from "./service/Game";
import {Player} from "./model/Player";
import {Camera} from "./model/Camera";
import {Weapon} from "./model/Weapon";
import {HitBox} from "./model/HitBox";

@Component({
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(private gameArea: GameArea, public game: Game) {

  }

  ngOnInit(): void {

    let player = new Player();
    player.setElement(new Weapon(player));
    this.gameArea.addElement(player);

    let camera = new Camera(player);
    this.gameArea.setCamera(camera);

    let shape = new Shape(50, 50, 1, 50, 50, "#00ff16");
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

    let shape2 = new Shape(300, 100, 1, 50, 50, "#0002ff");
    shape2.addBehaviour("sinus-freak", (game, shape) => {
      if(game.gameTime > 100) {
        shape.move(2, 6 * Math.sin(shape.x/10));
      }
    });
    this.gameArea.addElement(shape2);
    this.gameArea.addElement(new Shape(800, 100, 1, 50, 50, "#ff000f"));
    this.gameArea.addElement(new Shape(2000, 100, 1, 50, 50, "#fff300"));
    this.gameArea.addElement(new Shape(3000, 0, 3, 2, 500, "#000000"));

    this.gameArea.addElement(new HitBox(100, 100, 3, 100, 100, "#98ffb7"));

    this.game.init();
  }

  @HostListener('document:keydown', ['$event'])
  playerMovement(event: KeyboardEvent) {
    this.game.controls.addControl(event.key);
  }

  @HostListener('document:keyup', ['$event'])
  movementStop(event: KeyboardEvent) {
    this.game.controls.removeControl(event.key);
  }
}
