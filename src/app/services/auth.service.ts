import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { TokenService } from './token.service';
import { User } from '../models/user.model';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {
    this.initializeUser();
  }

  private initializeUser(): void {
    if (this.tokenService.isTokenValid()) {
      this.getCurrentUser().subscribe();
    }
  }

  getCurrentUser(): Observable<User | null> {
    if (!this.tokenService.isTokenValid()) {
      return of(null);
    }

    const token = this.tokenService.getToken();
    const payload = JSON.parse(atob(token!.split('.')[1]));

    return this.http.get<User>(`${environment.apiUrl}/users/${payload.id}`).pipe(
      tap(user => this.currentUserSubject.next(user)),
      catchError(error => {
        console.error('Error fetching user:', error);
        this.logout();
        return of(null);
      })
    );
  }

  signup(name: string, email: string, password: string): Observable<User> {
    return this.http.post<{user: User, token: string}>(`${environment.apiUrl}/users/signup`, {
      name,
      email,
      password
    }).pipe(
      tap(response => this.handleAuthentication(response)),
      map(response => response.user)
    );
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<{user: User, token: string}>(`${environment.apiUrl}/users/login`, {
      email,
      password
    }).pipe(
      tap(response => this.handleAuthentication(response)),
      map(response => response.user)
    );
  }

  logout(): void {
    this.tokenService.removeToken();
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.tokenService.isTokenValid();
  }

  private handleAuthentication(response: {user: User, token: string}): void {
    this.tokenService.setToken(response.token);
    this.currentUserSubject.next(response.user);
  }
}
