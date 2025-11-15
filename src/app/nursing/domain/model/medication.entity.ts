export class Medication {
  private _id: number;
  private _residentId: number;
  private _name: string;
  private _description: string;
  private _amount: number;
  private _expirationDate: Date;
  private _drugPresentation: string;
  private _dosage: string;

  constructor(medication: {
    id: number;
    residentId: number;
    name: string;
    description: string;
    amount: number;
    expirationDate: Date;
    drugPresentation: string;
    dosage: string;
  }) {
    this._id = medication.id;
    this._residentId = medication.residentId;
    this._name = medication.name;
    this._description = medication.description;
    this._amount = medication.amount;
    this._expirationDate = medication.expirationDate;
    this._drugPresentation = medication.drugPresentation;
    this._dosage = medication.dosage;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get residentId(): number {
    return this._residentId;
  }

  set residentId(value: number) {
    this._residentId = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get amount(): number {
    return this._amount;
  }

  set amount(value: number) {
    this._amount = value;
  }

  get expirationDate(): Date {
    return this._expirationDate;
  }

  set expirationDate(value: Date) {
    this._expirationDate = value;
  }

  get drugPresentation(): string {
    return this._drugPresentation;
  }

  set drugPresentation(value: string) {
    this._drugPresentation = value;
  }

  get dosage(): string {
    return this._dosage;
  }

  set dosage(value: string) {
    this._dosage = value;
  }
}
