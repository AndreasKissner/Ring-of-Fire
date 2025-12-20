import { Component, input, effect } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { retry } from 'rxjs';

@Component({
  selector: 'app-game-info',
  imports: [MatCardModule],
  templateUrl: './game-info.component.html',
  styleUrl: './game-info.component.scss',
})
export class GameInfoComponent {
  cardAction = [
    {
      title: 'Wasserfall',
      description:
        'Alle fangen gleichzeitig an zu trinken. Erst wenn Spieler 1 aufhört, darf Spieler 2 aufhören. Sobald Spieler 2 stoppt, darf Spieler 3 aufhören, und so weiter.',
    },
    {
      title: 'Du',
      description: 'Du suchst dir jemanden aus, der trinken muss.',
    },
    {
      title: 'Ich',
      description: 'Glückwunsch! Du musst selbst einen Schluck/Shot trinken!',
    },
    {
      title: 'Kategorie',
      description:
        'Nenne eine Kategorie (z. B. Biermarken). Jeder muss reihum einen Begriff dazu nennen. Wem nichts mehr einfällt, der trinkt.',
    },
    {
      title: 'Dance-Battle',
      description:
        'Spieler 1 macht eine Tanzbewegung vor. Spieler 2 wiederholt sie und fügt eine eigene hinzu. Wer einen Fehler macht, trinkt.',
    },
    { title: 'Mädels', description: 'Alle Frauen in der Runde trinken.' },
    {
      title: 'Himmel',
      description:
        'Alle reißen die Hände hoch! Wer zuletzt reagiert, muss trinken.',
    },
    {
      title: 'Partner',
      description:
        'Wähle einen Partner. Dein Partner muss immer trinken, wenn du trinkst (und umgekehrt).',
    },
    {
      title: 'Daumenkönig',
      description:
        'Du bist der Daumenkönig. Wann immer du deinen Daumen auf die Tischkante legst, müssen es dir alle gleichtun. Der Letzte trinkt.',
    },
    { title: 'Männer', description: 'Alle Männer in der Runde trinken.' },
    {
      title: 'Questionmaster',
      description:
        'Du bist der Questionmaster. Wer eine deiner Fragen beantwortet, muss trinken. Die Rolle endet, wenn jemand anderes diese Karte zieht.',
    },
    {
      title: 'Niemals zuvor...',
      description:
        'Sage etwas, das du noch nie getan hast. Alle, die es schon getan haben, müssen trinken.',
    },
    {
      title: 'Regel',
      description:
        'Stelle eine Regel auf (z. B. nicht mehr mit dem Vornamen ansprechen). Wer die Regel bricht, muss trinken.',
    },
  ];

  title: string = '';
  description: string = '';

  card = input<string>();
  constructor() {
    effect(() => {
      const value = this.card();
      if (!value) return;
      let cardNumber = +value.split('_')[1];
      this.title = this.cardAction[cardNumber - 1].title;
      this.description = this.cardAction[cardNumber - 1].description;
    });
  }
}
