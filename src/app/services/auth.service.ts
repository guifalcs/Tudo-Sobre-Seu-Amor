import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { TokenService } from './token.service';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {
    if (this.tokenService.isTokenValid()) {
      const currentToken = this.tokenService.getToken()
      const userId = JSON.parse(atob(currentToken!.split('.')[1]));
      this.http.get(`${environment.apiUrl}/users/${userId}`).subscribe({
        next: (user: any) => this.currentUserSubject.next(user),
        error: (error) => console.error(error),
        complete: () => console.log('User loading process done')
      })
    }
  }

  signup(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/users/signup`, {
      name,
      email,
      password
    }).pipe(
      tap(response => this.handleAuthentication(response))
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/users/login`, {
      email,
      password
    }).pipe(
      tap(response => this.handleAuthentication(response))
    );
  }

  logout(): void {
    this.tokenService.removeToken();
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.tokenService.isTokenValid();
  }

  private handleAuthentication(response: any): void {
    this.tokenService.setToken(response.token);
    this.currentUserSubject.next(response.user);
  }
}
