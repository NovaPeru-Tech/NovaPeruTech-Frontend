export class NursingHome
{
  private _id:number;
  private _businessProfileId:number;
  private _administratorId: number;

  constructor(nursingHome:{
    id:number,
    businessProfileId: number
    administratorId: number
  }) {
    this._id = nursingHome.id;
    this._businessProfileId = nursingHome.businessProfileId;
    this._administratorId = nursingHome.administratorId;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get businessProfileId(): number {
    return this._businessProfileId;
  }

  set businessProfileId(value: number) {
    this._businessProfileId = value;
  }

  get administratorId(): number {
    return this._administratorId;
  }

  set administratorId(value: number) {
    this._administratorId = value;
  }
}
