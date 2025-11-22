export class NursingHome
{
  private _id:number;
  private _businessProfileId:number;

  constructor(nursingHome:{
    id:number,
    businessProfileId: number
  }) {
    this._id = nursingHome.id;
    this._businessProfileId = nursingHome.businessProfileId;
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
}
