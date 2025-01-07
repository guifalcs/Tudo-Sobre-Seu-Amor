import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environment/environment';

export interface Place {
  id?: string;
  userId: string;
  name: string;
  type: string;
  address: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoveMapService {
  private placesSubject = new BehaviorSubject<Place[]>([]);
  places$ = this.placesSubject.asObservable();

  constructor(private http: HttpClient) {}

  addPlace(place: any): Observable<Place> {
    return this.http.post<Place>(`${environment.apiUrl}/lovemap`, place)
      .pipe(
        tap(newPlace => {
          const currentPlaces = this.placesSubject.value;
          this.placesSubject.next([...currentPlaces, newPlace]);
        })
      );
  }

  updatePlace(id: string, place: Partial<Place>): Observable<Place> {
    return this.http.patch<Place>(`${environment.apiUrl}/lovemap/${id}`, place)
      .pipe(
        tap(updatedPlace => {
          const currentPlaces = this.placesSubject.value;
          const index = currentPlaces.findIndex(p => p.id === id);
          if (index !== -1) {
            currentPlaces[index] = updatedPlace;
            this.placesSubject.next([...currentPlaces]);
          }
        })
      );
  }

  deletePlace(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/lovemap/${id}`)
      .pipe(
        tap(() => {
          const currentPlaces = this.placesSubject.value;
          this.placesSubject.next(currentPlaces.filter(p => p.id !== id));
        })
      );
  }
}
