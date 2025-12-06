export class Allergy {
  private _id: number;
  private _residentId: number;
  private _allergenName: string;
  private _reaction: string;
  private _severityLevel: string;
  private _typeOfAllergy: string;

  constructor(allergy: { id: number, residentId: number, allergenName: string, reaction: string, severityLevel: string, typeOfAllergy: string }) {
    this._id = allergy.id;
    this._residentId = allergy.residentId;
    this._allergenName = allergy.allergenName;
    this._reaction = allergy.reaction;
    this._severityLevel = allergy.severityLevel;
    this._typeOfAllergy = allergy.typeOfAllergy;
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

  get allergenName(): string {
    return this._allergenName;
  }

  set allergenName(value: string) {
    this._allergenName = value;
  }

  get reaction(): string {
    return this._reaction;
  }

  set reaction(value: string) {
    this._reaction = value;
  }

  get severityLevel(): string {
    return this._severityLevel;
  }

  set severityLevel(value: string) {
    this._severityLevel = value;
  }

  get typeOfAllergy(): string {
    return this._typeOfAllergy;
  }

  set typeOfAllergy(value: string) {
    this._typeOfAllergy = value;
  }
}
