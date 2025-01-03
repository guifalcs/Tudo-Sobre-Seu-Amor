import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';
import { environment } from '../../environment/environment';
import { Relationship, RelationshipFormData } from '../models/relationship.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RelationshipService {
  private relationshipSubject = new BehaviorSubject<Relationship | null>(null);
  relationship$ = this.relationshipSubject.asObservable();
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.initializeRelationship();
  }

  private initializeRelationship() {
    this.authService.currentUser$.pipe(
      filter(user => !!user?.user.id),
      switchMap(user => {
        this.isLoadingSubject.next(true);
        return this.http.get<Relationship>(`${environment.apiUrl}/relationship/${user!.user.id}`);
      })
    ).subscribe({
      next: (relationship) => {
        this.relationshipSubject.next(relationship);
        this.isLoadingSubject.next(false);
      },
      error: () => {
        this.relationshipSubject.next(null);
        this.isLoadingSubject.next(false);
      }
    });
  }

  createRelationship(data: RelationshipFormData): Observable<Relationship> {
    return this.authService.currentUser$.pipe(
      switchMap(user => {
        if (!user?.user.id) {
          throw new Error('User not found');
        }
        return this.http.post<Relationship>(`${environment.apiUrl}/relationship`, {
          ...data,
          userId: user.user.id
        });
      }),
      tap(relationship => this.relationshipSubject.next(relationship))
    );
  }

  hasRelationship(): Observable<boolean> {
    return this.relationship$.pipe(
      map(relationship => relationship !== null)
    );
  }
}
