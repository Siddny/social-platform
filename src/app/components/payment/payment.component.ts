import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentData } from 'src/app/models/app.model';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  
  paymentData: PaymentData = {
    name: '',
    cardNumber: '',
    expirationDate: '',
    cvv: ''
  };

  constructor(
    private paymentService: PaymentService,
    private sharedService: SharedService,
    private router: Router,
    ) {}

  makePayment(): void {
    this.paymentService.makePayment().subscribe(
      (success) => {
        if (success) {
          localStorage.setItem('is_premium_member', 'true');
          const currentUrl = this.router.url;
          if(currentUrl == '/feeds') {
            this.sharedService.refreshPage();
          } else {
            this.router.navigate(['/feeds']);
          }
        }
      }
    );
  }
}
