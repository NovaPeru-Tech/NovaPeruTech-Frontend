import { SubscriptionResponse } from "../../infrastructure/subscriptions-response";

export class Subscription {
  constructor(
    public subscriptionId: string,
    public accountId: string,
    public planId: string,
    public cycle: "monthly" | "annual",
    public price: number,
    public status: "active" | "inactive" | "pending",
    public createdAt: string
  ) {}

  static fromResponse(data: SubscriptionResponse): Subscription {
    return new Subscription(
      data.subscriptionId,
      data.accountId,
      data.planId,
      data.cycle,
      data.price,
      data.status,
      data.createdAt
    );
  }
}
