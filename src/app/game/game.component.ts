import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from "../player/player.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-game',
  imports: [CommonModule, PlayerComponent, MatButtonModule,MatIconModule,],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  pickCardAnimation = false;
  game!: Game;
  currentCard: string | undefined = '';

  constructor() {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log('Game is', this.game);
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      console.log('New card is:  ' + this.currentCard);
      this.pickCardAnimation = true;
 
      
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard!);
        this.pickCardAnimation = false;
      }, 1000);
    }
  }
}
