export class UpdateContractStatusCommand {
  private _newStatus: string;

  constructor(updateContractStatusCommand: { newStatus: string }) {
    this._newStatus = updateContractStatusCommand.newStatus;
  }

  get newStatus(): string {
    return this._newStatus;
  }

  set newStatus(value: string) {
    this._newStatus = value;
  }
}
