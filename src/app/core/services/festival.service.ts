import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Festival } from '../models/festival.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FestivalService {
    
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/festivals`;

    getAllFestivals(): Observable<Festival[]> {
        return this.http.get<Festival[]>(this.apiUrl);
    }

    getFestivalById(id: number): Observable<Festival> {
        return this.http.get<Festival>(`${this.apiUrl}/${id}`);
    }

}
