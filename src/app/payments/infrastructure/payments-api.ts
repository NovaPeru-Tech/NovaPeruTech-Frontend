import { AccountsApiEndpoint } from "./accounts-api-endpoint";
import { PlansApiEndpoint } from "./plans-api-endpoint";
import { SubscriptionsApiEndpoint } from "./subscriptions-api-endpoint";
import { AccountResponse } from "./accounts-response";
import { PlanResponse } from "./plans-response";
import { SubscriptionResponse } from "./subscriptions-response";

export class PaymentsApi {
  async getAvailablePlans(): Promise<PlanResponse[]> {
    const response = await fetch(PlansApiEndpoint.LIST_PLANS);
    if (!response.ok) throw new Error("Failed to fetch plans");
    return response.json();
  }

  async createAccount(payload: {
    fullName: string;
    email: string;
    phone: string;
    country: string;
    role: string;
  }): Promise<AccountResponse> {
    const response = await fetch(AccountsApiEndpoint.CREATE_ACCOUNT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Failed to create account");
    return response.json();
  }

  async createSubscription(payload: {
    accountId: string;
    planId: string;
    cycle: "monthly" | "annual";
  }): Promise<SubscriptionResponse> {
    const response = await fetch(SubscriptionsApiEndpoint.CREATE_SUBSCRIPTION, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Failed to create subscription");
    return response.json();
  }
}
