export interface PlanResponse {
  id: string;
  name: "Family Plan" | "Nursing Home Plan";
  description: string;
  priceMonthly: number;
  priceAnnual: number;
  discountAnnual: number;
  type: "family" | "nursing-home";
  features: string[];
}
