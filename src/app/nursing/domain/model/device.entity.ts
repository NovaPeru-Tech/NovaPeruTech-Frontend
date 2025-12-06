export class Device {
  private _id: number;
  private _deviceId: string;
  private _residentId: number;
  private _assignedBy: string;
  private _assignedAt: string;
  private _status: string;

  constructor(device: { id: number, deviceId: string, residentId: number, assignedBy: string
  , assignedAt: string, status: string }) {
    this._id = device.id;
    this._deviceId = device.deviceId;
    this._residentId = device.residentId;
    this._assignedAt = device.assignedAt;
    this._assignedBy = device.assignedBy;
    this._status = device.status;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get deviceId(): string {
    return this._deviceId;
  }

  set deviceId(value: string) {
    this._deviceId = value;
  }

  get residentId(): number {
    return this._residentId;
  }

  set residentId(value: number) {
    this._residentId = value;
  }

  get assignedBy(): string {
    return this._assignedBy;
  }

  set assignedBy(value: string) {
    this._assignedBy = value;
  }

  get assignedAt(): string {
    return this._assignedAt;
  }

  set assignedAt(value: string) {
    this._assignedAt = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }
}
