import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor() { }

  makePayment(): Observable<boolean> {
    // Simulate a successful payment
    // In a real-world scenario, you would integrate with a payment gateway
    return of(true);
  }
}
