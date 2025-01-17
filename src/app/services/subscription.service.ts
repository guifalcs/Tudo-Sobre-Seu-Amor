import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private readonly apiUrl = `${environment.apiUrl}/subscription`;

  constructor(
    private http: HttpClient
  ) { }

  getSubscriptionPlans(){
    return this.http.get(`${this.apiUrl}/plans`);
  }

  createCheckoutSession(priceId: string, userId: string){
    return this.http.post(`${this.apiUrl}/create-checkout-session`, {
      priceId, userId
    });
  }

  redirectToCheckout = (priceId: string, userId: string) => {
    this.createCheckoutSession(priceId, userId).subscribe({
      next: (session: any) => {
        window.location.href = session.url
      },
      error: this.handleError,
      complete: () => {}
    })
  }

  handleError = (error: any) => {
    alert("Erro ao direcionar para o checkout")
  }

}
