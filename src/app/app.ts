import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Carte } from './features/carte/carte';
import { Filtres } from './features/filtres/filtres';

@Component({
  imports: [RouterOutlet, Carte, Filtres],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('frontend');
}
