export class RoomCommand {
  private _capacity: number;
  private _type: string;
  private _roomNumber: string;

  constructor(roomCommand: {
  capacity: number;
  type: string;
  roomNumber: string;
  }) {
    this._capacity = roomCommand.capacity;
    this._type = roomCommand.type;
    this._roomNumber = roomCommand.roomNumber;
  }

  get capacity(): number {
    return this._capacity;
  }

  set capacity(value: number) {
    this._capacity = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get roomNumber(): string {
    return this._roomNumber;
  }

  set roomNumber(value: string) {
    this._roomNumber = value;
  }
}
