export class StaffMember {
  // Basic information
  private _id: number;
  private _personProfileId: number;

  // Emergency contact information
  private _emergencyContactFirstName: string;
  private _emergencyContactLastName: string;
  private _emergencyContactPhoneNumber: string;

  private _status: string;

  constructor(staffMember: {
    id: number;
    personProfileId: number;

    // New emergency contact
    emergencyContactFirstName: string;
    emergencyContactLastName: string;
    emergencyContactPhoneNumber: string;

    status: string;
  }) {
    this._id = staffMember.id;
    this._personProfileId = staffMember.personProfileId;

    // Emergency contact
    this._emergencyContactFirstName = staffMember.emergencyContactFirstName;
    this._emergencyContactLastName = staffMember.emergencyContactLastName;
    this._emergencyContactPhoneNumber = staffMember.emergencyContactPhoneNumber;

    this._status = staffMember.status;
  }

  // Getters and Setters
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get personProfileId(): number {
    return this._personProfileId;
  }

  set personProfileId(value: number) {
    this._personProfileId = value;
  }

  get emergencyContactFirstName(): string {
    return this._emergencyContactFirstName;
  }

  set emergencyContactFirstName(value: string) {
    this._emergencyContactFirstName = value;
  }

  get emergencyContactLastName(): string {
    return this._emergencyContactLastName;
  }

  set emergencyContactLastName(value: string) {
    this._emergencyContactLastName = value;
  }

  get emergencyContactPhoneNumber(): string {
    return this._emergencyContactPhoneNumber;
  }

  set emergencyContactPhoneNumber(value: string) {
    this._emergencyContactPhoneNumber = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }
}
