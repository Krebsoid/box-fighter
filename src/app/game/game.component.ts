import {Component, HostListener, OnInit} from '@angular/core';
import {GameArea} from "./service/GameArea";
import {Game} from "./service/Game";
import {GameScene} from "./model/scene/GameScene";
import {EndScene} from "./model/scene/EndScene";

@Component({
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(public gameArea: GameArea, public game: Game) {

  }

  ngOnInit(): void {
    this.game.scenes.push(new GameScene());
    this.game.scenes.push(new EndScene());
    this.game.changeGameState('RUNNING');
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
