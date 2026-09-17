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
    this.map = L.map('carte').setView([46.6, 2.5], 6);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    this.festivalService.getAllFestivals().subscribe((festivals: Festival[]) => {
      festivals.forEach((festival: Festival) => {
        L.marker([festival.lieu.latitude, festival.lieu.longitude]).addTo(this.map);
      });
    });
  }
}
