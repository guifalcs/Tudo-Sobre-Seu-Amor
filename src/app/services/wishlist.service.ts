import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environment/environment';

export interface WishItem {
  id?: string;
  userId: string;
  title: string;
  link: string;
}

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistSubject = new BehaviorSubject<WishItem[]>([]);
  wishlist$ = this.wishlistSubject.asObservable();

  constructor(private http: HttpClient) {}

  addWish(wish: any): Observable<WishItem> {
    return this.http.post<WishItem>(`${environment.apiUrl}/wishlist`, wish)
      .pipe(
        tap(newWish => {
          const currentWishes = this.wishlistSubject.value;
          this.wishlistSubject.next([...currentWishes, newWish]);
        })
      );
  }

  updateWish(id: string, wish: Partial<WishItem>): Observable<WishItem> {
    return this.http.put<WishItem>(`${environment.apiUrl}/wishlist/${id}`, wish)
      .pipe(
        tap(updatedWish => {
          const currentWishes = this.wishlistSubject.value;
          const index = currentWishes.findIndex(w => w.id === id);
          if (index !== -1) {
            currentWishes[index] = updatedWish;
            this.wishlistSubject.next([...currentWishes]);
          }
        })
      );
  }

  deleteWish(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/wishlist/${id}`)
      .pipe(
        tap(() => {
          const currentWishes = this.wishlistSubject.value;
          this.wishlistSubject.next(currentWishes.filter(w => w.id !== id));
        })
      );
  }

  setWishes(wishes: any[]) {
    this.wishlistSubject.next(wishes);
  }
}
