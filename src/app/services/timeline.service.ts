import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environment/environment';

export interface TimelineEvent {
  id?: string;
  userId: string;
  title: string;
  date: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class TimelineService {
  private timelineSubject = new BehaviorSubject<any[]>([]);
  timeline$ = this.timelineSubject.asObservable();

  constructor(private http: HttpClient) {}

  addEvent(event: Omit<TimelineEvent, 'id'>): Observable<any> {
    return this.http.post<TimelineEvent>(`${environment.apiUrl}/timeline`, event)
      .pipe(
        tap(newEvent => {
          const currentEvents = this.timelineSubject.value;
          const updatedEvents = [...currentEvents, newEvent].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );
          this.timelineSubject.next(updatedEvents);
        })
      );
  }

  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/timeline/${id}`)
      .pipe(
        tap(() => {
          const currentEvents = this.timelineSubject.value;
          this.timelineSubject.next(
            currentEvents.filter(event => event.id !== id)
          );
        })
      );
  }

  setEvents(events: any[]) {
    const sortedEvents = events.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    this.timelineSubject.next(sortedEvents);
    return sortedEvents
  }
}
