import { Component } from '@angular/core';

@Component({
  selector: 'app-subscription-plan-nursing',
  templateUrl: './subscription-plan-nursing.html',
  styleUrls: ['./subscription-plan-nursing.css']
})
export class SubscriptionPlanNursing {

  constructor() {}

  choosePlan(type: string) {
    console.log("Selected Nursing plan:", type);
  }
}
