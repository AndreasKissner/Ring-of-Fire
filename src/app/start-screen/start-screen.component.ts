import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, addDoc } from '@angular/fire/firestore'; // Wichtige Imports
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss',
})
export class StartScreenComponent {
  // Wir nutzen NUR noch inject (das ist der moderne Weg)
  private router = inject(Router);
  private firestore = inject(Firestore);

  // Der Constructor kann jetzt komplett leer bleiben oder ganz weg
  constructor() {}

  async newGame() {
    // 1. Ein neues Spiel-Objekt erstellen
    let game = new Game();
    
    // 2. Das Spiel in Firebase speichern
    const gamesCollection = collection(this.firestore, 'games');
    
    // Wir warten auf Firebase, bis es uns das Dokument erstellt hat
    const docRef = await addDoc(gamesCollection, game.toJson());

    // 3. WICHTIG: Wir navigieren jetzt zur ID des neuen Dokuments!
    // docRef.id ist die kryptische Nummer, die Firebase automatisch erstellt hat
    this.router.navigateByUrl('/game/' + docRef.id);
  }
}