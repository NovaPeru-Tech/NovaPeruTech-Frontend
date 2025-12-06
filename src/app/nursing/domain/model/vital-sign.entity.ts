export class VitalSign {
  private _id: number;
  private _residentId: number;
  private _measurementId: number;
  private _severityLevel: string;

  constructor(vitalSign: {
    id: number;
    residentId: number;
    measurementId: number;
    severityLevel: string;
  }) {
    this._id = vitalSign.id;
    this._measurementId = vitalSign.measurementId;
    this._residentId = vitalSign.residentId;
    this._severityLevel = vitalSign.severityLevel;
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

  get measurementId(): number {
    return this._measurementId;
  }

  set measurementId(value: number) {
    this._measurementId = value;
  }

  get severityLevel(): string {
    return this._severityLevel;
  }

  set severityLevel(value: string) {
    this._severityLevel = value;
  }
}
