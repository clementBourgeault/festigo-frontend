import { Component, inject } from '@angular/core';
import { FestivalService } from '../../core/services/festival.service';

@Component({
  imports: [],
  selector: 'app-filtres',
  styleUrl: './filtres.css',
  templateUrl: './filtres.html',
})
export class Filtres {

  private festivalService = inject(FestivalService);
  protected departements: string[] = [
    'Finistère',
    'Loire-Atlantique',
    'Hauts-de-Seine',
    'Paris',
    'Pas-de-Calais',
    'Lot-et-Garonne',
    'Ardennes',
    'Calvados',
    'Charente-Maritime',
    'Rhône',
    'Savoie',
    'Cher',
  ];

  onDepartementChange(event: Event): void {
    const valeur = (event.target as HTMLSelectElement).value;
    this.festivalService.departementSelectionne.set(valeur || null);
  }

}
