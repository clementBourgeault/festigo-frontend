import { AfterViewInit, Component, inject } from '@angular/core';
import * as L from 'leaflet';
import { FestivalService } from '../../core/services/festival.service';
import { Festival } from '../../core/models/festival.model';

// Correction du chemin des icônes par défaut, cassé par le build Angular
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

@Component({
  imports: [],
  selector: 'app-carte',
  styleUrl: './carte.css',
  templateUrl: './carte.html',
})
export class Carte implements AfterViewInit {
  private map!: L.Map;
  private festivalService = inject(FestivalService);

  ngAfterViewInit(): void {
    this.initialiserCarte();
    this.chargerFestivals();
  }

  private initialiserCarte(): void {
    this.map = L.map('carte').setView([46.6, 2.5], 6);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  }

  private chargerFestivals(): void {
    this.festivalService.getAllFestivals().subscribe((festivals: Festival[]) => {
      festivals.forEach((festival: Festival) => {
        this.ajouterMarqueur(festival);
      });
    });
  }

  private ajouterMarqueur(festival: Festival): void {
    L.marker([festival.lieu.latitude, festival.lieu.longitude])
      .bindPopup(this.creerContenuPopup(festival))
      .addTo(this.map);
  }

  private creerContenuPopup(festival: Festival): string {
    return `
      <strong>${festival.nom}</strong><br>
      Du ${this.formaterDate(festival.dateDebut)} au ${this.formaterDate(festival.dateFin)}<br>
      ${festival.lieu.ville}<br>
      <a href="${festival.siteWeb}" target="_blank" rel="noopener noreferrer">${festival.siteWeb}</a>
    `;
  }

  private formaterDate(dateIso: string): string {
    const date = new Date(dateIso);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
}
