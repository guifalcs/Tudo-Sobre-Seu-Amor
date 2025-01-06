import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environment/environment';
import { SpecialDate } from '../models/specialDates.model';

@Injectable({
  providedIn: 'root'
})
export class SpecialDatesService {
  private specialDatesSubject = new BehaviorSubject<SpecialDate[]>([]);
  specialDates$ = this.specialDatesSubject.asObservable();

  constructor(private http: HttpClient) {}

  addSpecialDate(date: Omit<SpecialDate, 'id'>): Observable<SpecialDate> {
    return this.http.post<SpecialDate>(`${environment.apiUrl}/specialDate`, date)
      .pipe(
        tap(newDate => {
          const currentDates = this.specialDatesSubject.value;
          this.specialDatesSubject.next([...currentDates, newDate]);
        })
      );
  }

  updateSpecialDate(id: string, date: Partial<SpecialDate>): Observable<SpecialDate> {
    return this.http.patch<SpecialDate>(`${environment.apiUrl}/speciaDate/${id}`, date)
      .pipe(
        tap(updatedDate => {
          const currentDates = this.specialDatesSubject.value;
          const index = currentDates.findIndex(d => d.id === id);
          if (index !== -1) {
            currentDates[index] = updatedDate;
            this.specialDatesSubject.next([...currentDates]);
          }
        })
      );
  }

  deleteSpecialDate(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/specialDate/${id}`)
      .pipe(
        tap(() => {
          const currentDates = this.specialDatesSubject.value;
          this.specialDatesSubject.next(currentDates.filter(d => d.id !== id));
        })
      );
  }
}
