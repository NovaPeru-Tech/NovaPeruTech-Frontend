export class CreateAllergyCommand {
  private _allergenName: string;
  private _reaction: string;
  private _severityLevel: string;
  private _typeOfAllergy: string;

  constructor(creteAllergyCommand: { allergenName: string, reaction: string, severityLevel: string, typeOfAllergy: string }) {
    this._allergenName = creteAllergyCommand.allergenName;
    this._reaction = creteAllergyCommand.reaction;
    this._severityLevel = creteAllergyCommand.severityLevel;
    this._typeOfAllergy = creteAllergyCommand.typeOfAllergy;
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
