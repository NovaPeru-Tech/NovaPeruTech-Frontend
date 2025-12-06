import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-subscription-choose',
  templateUrl: './subscription-choose.html',
  styleUrls: ['./subscription-choose.css']
})
export class SubscriptionChoosePage {
  constructor() {
    console.log("Subscription Choose Page loaded");
  }
}
