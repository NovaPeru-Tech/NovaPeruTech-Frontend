import { AccountResponse } from "../../infrastructure/accounts-response";

export class Account {
  constructor(
    public id: string,
    public fullName: string,
    public email: string,
    public phone: string,
    public country: string,
    public role: "family" | "nursing-home",
    public createdAt: string,
    public updatedAt: string
  ) {}

  static fromResponse(data: AccountResponse): Account {
    return new Account(
      data.id,
      data.fullName,
      data.email,
      data.phone,
      data.country,
      data.role,
      data.createdAt,
      data.updatedAt
    );
  }
}
