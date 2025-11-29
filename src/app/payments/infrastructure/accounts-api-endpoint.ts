export const AccountsApiEndpoint = {
  CREATE_ACCOUNT: "/api/payments/accounts",
  GET_ACCOUNT_BY_ID: (id: string) => `/api/payments/accounts/${id}`,
  UPDATE_ACCOUNT: (id: string) => `/api/payments/accounts/${id}`,
};
