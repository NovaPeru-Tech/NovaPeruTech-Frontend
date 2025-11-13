export class Contract {
  private _id: number;
  private _staffMemberId: number;

  private _startDate: Date;
  private _endDate: Date;

  private _typeOfContract: string;
  private _staffRole: string;
  private _workShift: string;
  private _status: string;

  constructor(contract: {
    id: number;
    staffMemberId: number;

    startDate: Date;
    endDate: Date;

    typeOfContract: string;
    staffRole: string;
    workShift: string;
    status: string;
  }) {
    this._id = contract.id;
    this._staffMemberId = contract.staffMemberId;

    this._startDate = contract.startDate;
    this._endDate = contract.endDate;

    this._typeOfContract = contract.typeOfContract;
    this._staffRole = contract.staffRole;
    this._workShift = contract.workShift;
    this._status = contract.status;
  }

  // Getters and Setters
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get staffMemberId(): number {
    return this._staffMemberId;
  }

  set staffMemberId(value: number) {
    this._staffMemberId = value;
  }

  get startDate(): Date {
    return this._startDate;
  }

  set startDate(value: Date) {
    this._startDate = value;
  }

  get endDate(): Date {
    return this._endDate;
  }

  set endDate(value: Date) {
    this._endDate = value;
  }

  get typeOfContract(): string {
    return this._typeOfContract;
  }

  set typeOfContract(value: string) {
    this._typeOfContract = value;
  }

  get staffRole(): string {
    return this._staffRole;
  }

  set staffRole(value: string) {
    this._staffRole = value;
  }

  get workShift(): string {
    return this._workShift;
  }

  set workShift(value: string) {
    this._workShift = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }
}
