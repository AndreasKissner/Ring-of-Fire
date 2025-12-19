import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../../models/game';

@Component({
  selector: 'app-game',
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  pickCardAnimation = false;
  game! : Game;
  currentCard : string | undefined = "";

  constructor(){
    this.newGame();
  }

  newGame(){
   this.game = new Game();
   console.log(this.game)
  }
  
  takeCard() {
    if(!this.pickCardAnimation){
    this.currentCard = this.game.stack.pop();
    console.log(this.currentCard);
    this.pickCardAnimation = true;

    setTimeout(()=>{
      this.pickCardAnimation = false;
    },1500)
  }
  }
}
