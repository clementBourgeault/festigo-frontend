import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Festival } from '../models/festival.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FestivalService {
    
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/festivals`;
    departementSelectionne = signal<string | null>(null);

    getAllFestivals(departement?: string | null): Observable<Festival[]> {
        let params = new HttpParams();
        if (departement) {
            params = params.set('departement', departement);
        }
        return this.http.get<Festival[]>(this.apiUrl, { params });
    }

    getFestivalById(id: number): Observable<Festival> {
        return this.http.get<Festival>(`${this.apiUrl}/${id}`);
    }

}
