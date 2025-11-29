export const SubscriptionsApiEndpoint = {
  CREATE_SUBSCRIPTION: "/api/payments/subscriptions",

  GET_SUBSCRIPTION_BY_ACCOUNT: (accountId: string) =>
    `/api/payments/subscriptions/account/${accountId}`,
};
