export class Controls {

  up: boolean = false;
  down: boolean = false;
  left: boolean = false;
  right: boolean = false;
  shoot: boolean = false;

  addControl(key: string) {
    if(key == "w") {
      this.up = true;
    }
    if(key == "s") {
      this.down = true;
    }
    if(key == "d") {
      this.right = true;
    }
    if(key == "a") {
      this.left = true;
    }
    if(key == " ") {
      this.shoot = true;
    }
  }

  removeControl(key: string) {
    if(key == "w") {
      this.up = false;
    }
    if(key == "s") {
      this.down = false;
    }
    if(key == "d") {
      this.right = false;
    }
    if(key == "a") {
      this.left = false;
    }
    if(key == " ") {
      this.shoot = false;
    }
  }

}
