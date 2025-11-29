export interface SubscriptionResponse {
  subscriptionId: string;
  accountId: string;
  planId: string;
  cycle: "monthly" | "annual";
  price: number;
  status: "active" | "inactive" | "pending";
  createdAt: string;
}
