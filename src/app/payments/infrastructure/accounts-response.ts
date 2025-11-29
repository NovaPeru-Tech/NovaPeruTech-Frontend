export interface AccountResponse {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  role: "family" | "nursing-home";
  createdAt: string;
  updatedAt: string;
}
