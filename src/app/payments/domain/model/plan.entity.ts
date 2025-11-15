/*
 * @purpose: Represents a subscription plan entity in the Veyra Payments bounded context.
 * @description: Defines the characteristics of available pricing plans, including
 *               id, type, description, price, and limits.
 */

export class Plan {

  private _planId: number;
  private _planType: string;
  private _description: string;
  private _price: number;
  private _maxResidents: number;
  private _minResidents: number;

  constructor({
                planId = 0,
                planType = '',
                description = '',
                price = 0,
                maxResidents = 0,
                minResidents = 0,
              }: {
    planId?: number;
    planType?: string;
    description?: string;
    price?: number;
    maxResidents?: number;
    minResidents?: number;
  }) {
    this._planId = planId;
    this._planType = planType;
    this._description = description;
    this._price = price;
    this._maxResidents = maxResidents;
    this._minResidents = minResidents;
  }

  // Getters & Setters

  get planId(): number {
    return this._planId;
  }

  set planId(value: number) {
    this._planId = value;
  }

  get planType(): string {
    return this._planType;
  }

  set planType(value: string) {
    this._planType = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }

  get maxResidents(): number {
    return this._maxResidents;
  }

  set maxResidents(value: number) {
    this._maxResidents = value;
  }

  get minResidents(): number {
    return this._minResidents;
  }

  set minResidents(value: number) {
    this._minResidents = value;
  }
}
