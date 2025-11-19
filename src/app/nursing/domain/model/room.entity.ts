export class Room {
  private _id: number;
  private _roomNumber: string;
  private _nursingHomeId: number;
  private _capacity: number;
  private _occupied: number;
  private _type: string;
  private _status: string;

  constructor(room: { id: number, roomNumber: string, nursingHomeId: number, capacity: number,
    occupied: number, type: string, status: string }) {
    this._id = room.id;
    this._roomNumber = room.roomNumber;
    this._nursingHomeId = room.nursingHomeId;
    this._capacity = room.capacity;
    this._occupied = room.occupied;
    this._type = room.type;
    this._status = room.status;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get roomNumber(): string {
    return this._roomNumber;
  }

  set roomNumber(value: string) {
    this._roomNumber = value;
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

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }

  get occupied(): number {
    return this._occupied;
  }

  set occupied(value: number) {
    this._occupied = value;
  }

  get nursingHomeId(): number {
    return this._nursingHomeId;
  }

  set nursingHomeId(value: number) {
    this._nursingHomeId = value;
  }
}
