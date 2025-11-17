export class Room {
  private _id: number;
  private _number: string;
  private _capacity: number;
  private _occupied: number;
  private _type: string;
  private _status: string;

  constructor(room: { id: number, number: string, capacity: number,
    occupied: number, type: string, status: string }) {
    this._id = room.id;
    this._number = room.number;
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

  get number(): string {
    return this._number;
  }

  set number(value: string) {
    this._number = value;
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
}
