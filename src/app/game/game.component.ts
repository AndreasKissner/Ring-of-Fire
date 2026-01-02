import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from "../player/player.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PlayerMobileComponent } from '../player-mobile/player-mobile.component';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, GameInfoComponent,PlayerMobileComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit {
  game: Game = new Game();
  gameId: string = '';


  private route = inject(ActivatedRoute);
  private firestore = inject(Firestore);
  private dialog = inject(MatDialog);

  // Das ist unser Stream für das HTML
  game$!: Observable<any>;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.gameId = id; // Speicher die ID für später

      // Modern: Wir nutzen 'doc' und 'docData' statt 'valueChanges'
      const gameDoc = doc(this.firestore, `games/${id}`);

      docData(gameDoc).subscribe((game: any) => {
        if (game) {
          console.log('Game update', game);
          this.game.currentPlayer = game.currentPlayer;
          this.game.playedCards = game.playedCards;
          this.game.players = game.players;
          this.game.stack = game.stack;
          this.game.pickCardAnimation = game.pickCardAnimation;
          this.game.currentCard = game.currentCard;
        }
      });
    });
  }

  async saveGame() {
    const gameDoc = doc(this.firestore, `games/${this.gameId}`);
    // Packe die Daten in ein neues Objekt { ... }
    await updateDoc(gameDoc, { ...this.game.toJson() });
  }

  takeCard() {
    // Wir fügen "this.game.players.length > 0" hinzu
    // Das verhindert den Absturz bei der Berechnung des Spielers (Division durch 0)
    if (!this.game.pickCardAnimation && this.game.players.length > 0 && this.game.stack.length > 0) {

      this.game.currentCard = this.game.stack.pop() || '';
      this.game.pickCardAnimation = true;

      // Nächster Spieler ist dran
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      // Erster Save: Alle sehen den Start der Animation
      this.saveGame();

      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;

        // Zweiter Save: Die Karte landet auf dem Ablagestapel
        this.saveGame();
      }, 1000);

    } else if (this.game.players.length === 0) {
      // Falls kein Spieler da ist, öffnen wir automatisch den Dialog
      this.openDialog();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame(); // Speichern, wenn Spieler hinzugefügt
      }
    });
  }


}