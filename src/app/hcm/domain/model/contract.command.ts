export class ContractCommand {
  private _startDate: string;
  private _endDate: string;

  private _typeOfContract: string;
  private _staffRole: string;
  private _workShift: string;

  constructor(contractCommand: {
    startDate: string;
    endDate: string;

    typeOfContract: string;
    staffRole: string;
    workShift: string;
  }) {
    this._startDate = contractCommand.startDate;
    this._endDate = contractCommand.endDate;

    this._typeOfContract = contractCommand.typeOfContract;
    this._staffRole = contractCommand.staffRole;
    this._workShift = contractCommand.workShift;
  }

  // Getters and Setters
  get startDate(): string {
    return this._startDate;
  }

  set startDate(value: string) {
    this._startDate = value;
  }

  get endDate(): string {
    return this._endDate;
  }

  set endDate(value: string) {
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
}
