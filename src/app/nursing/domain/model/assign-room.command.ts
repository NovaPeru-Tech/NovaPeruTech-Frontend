export class AssignRoomCommand {
  private _roomNumber: string;

  constructor(assignRoomCommand: { roomNumber: string }) {
    this._roomNumber = assignRoomCommand.roomNumber;
  }

  get roomNumber(): string {
    return this._roomNumber;
  }

  set roomNumber(value: string) {
    this._roomNumber = value;
  }
}
