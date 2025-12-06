import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'payment-checkout',
  templateUrl: './payment-checkout.html',
  styleUrls: ['./payment-checkout.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    CurrencyPipe
  ]
})
export class PaymentCheckoutPage {
  /** Values passed from route */
  planPrice: number = 0;
  planTitle: string = 'Selected Plan';
  period: string = 'monthly';

  stripeForm: FormGroup;
  isLoading = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {

    // Build form
    this.stripeForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expMonth: ['', Validators.required],
      expYear: ['', Validators.required],
      cvc: ['', Validators.required]
    });

    // Get URL params dynamically
    this.route.params.subscribe(p => {
      const type = p['type'];
      this.period = p['cycle'];

      // Plan title
      this.planTitle =
        type === 'family'
          ? 'Family Plan'
          : type === 'nursing-home'
            ? 'Nursing Home Plan'
            : 'Subscription';

      this.planPrice = this.getPrice(this.planTitle, this.period);
    });
  }

  /** Pricing logic */
  getPrice(plan: string, period: string): number {
    if (plan === 'Family Plan') {
      return period === 'monthly' ? 30 : 300;
    }
    if (plan === 'Nursing Home Plan') {
      return period === 'monthly' ? 300 : 3000;
    }
    return 0;
  }

  /** Cancel button */
  cancel() {
    history.back();
  }

  /** Simulate payment */
  submitPayment() {
    if (this.stripeForm.invalid) {
      this.error = 'Please fill out all fields';
      return;
    }

    this.error = null;
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
      alert('Payment simulated successfully!');
    }, 1500);
  }
}
