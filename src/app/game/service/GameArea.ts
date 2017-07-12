import { Element } from "../model/Element";
import { Injectable } from "@angular/core";
import {Camera} from "../model/Camera";

@Injectable()
export class GameArea {

  elements: Element[] = [];
  graveyard: Element[] = [];
  camera: Camera;
  context: any;

  addElement(element: Element) {
    this.elements.push(element);
  }

  removeElement(element: Element) {
    let index = this.elements.indexOf(element);
    if(index > -1) {
      this.elements.splice(index, 1);
      this.graveyard.push(element);
    }
  }

  setCamera(camera: Camera) {
    this.camera = camera;
    this.addElement(camera);
  }

  repaint() {
    this.getContext().clearRect(0, 0, 1024, 500);
  }

  getContext() {
    if(this.context) {
      return this.context;
    } else {
      let canvas: any = document.getElementById('game');
      this.context = canvas.getContext("2d");
      return this.context;
    }
  }

  clear() {
    this.elements = [];
  }

}
