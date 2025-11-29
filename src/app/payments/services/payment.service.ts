import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const headers = { headers: new HttpHeaders({'Content-Type':'application/json'}) };

@Injectable({ providedIn: 'root' })
export class PaymentService {
  stripeURL = 'http://localhost:4200/stripe/'; // adapta si hace falta

  constructor(private http: HttpClient) {}

  pagar(dto: { token: string; amount: number; currency: string; description: string; }): Observable<any> {
    return this.http.post(this.stripeURL + 'paymentintent', dto, headers);
  }
}
