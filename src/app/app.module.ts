import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { StartComponent } from "./start/start.component";
import {GameComponent} from "./game/game.component";
import {GameArea} from "./game/service/GameArea";
import {Game} from "./game/service/Game";

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    GameArea,
    Game
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
