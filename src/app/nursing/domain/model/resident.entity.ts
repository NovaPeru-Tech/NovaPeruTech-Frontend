/**
 * Represents a resident with legal representative, and emergency contact information.
 * This class encapsulates all relevant data for managing residents in a care or facility system.
 */
export class Resident {
  // Basic information
  private _id: number;
  private _personProfileId: number;

  // Legal representative information
  private _legalRepresentativeFirstName: string;
  private _legalRepresentativeLastName: string;
  private _legalRepresentativePhoneNumber: string;

  // Emergency contact information
  private _emergencyContactFirstName: string;
  private _emergencyContactLastName: string;
  private _emergencyContactPhoneNumber: string;

  private _roomId: number | null;

  constructor(resident: {
    id: number;
    personProfileId: number;

    // New legal representative
    legalRepresentativeFirstName: string;
    legalRepresentativeLastName: string;
    legalRepresentativePhoneNumber: string;

    // New emergency contact
    emergencyContactFirstName: string;
    emergencyContactLastName: string;
    emergencyContactPhoneNumber: string;

    roomId: number | null;
  }) {
    this._id = resident.id;
    this._personProfileId = resident.personProfileId;

    // Legal representative
    this._legalRepresentativeFirstName = resident.legalRepresentativeFirstName;
    this._legalRepresentativeLastName = resident.legalRepresentativeLastName;
    this._legalRepresentativePhoneNumber = resident.legalRepresentativePhoneNumber;

    // Emergency contact
    this._emergencyContactFirstName = resident.emergencyContactFirstName;
    this._emergencyContactLastName = resident.emergencyContactLastName;
    this._emergencyContactPhoneNumber = resident.emergencyContactPhoneNumber;

    this._roomId = resident.roomId ?? null;
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

  get legalRepresentativeFirstName(): string {
    return this._legalRepresentativeFirstName;
  }

  set legalRepresentativeFirstName(value: string) {
    this._legalRepresentativeFirstName = value;
  }

  get legalRepresentativeLastName(): string {
    return this._legalRepresentativeLastName;
  }

  set legalRepresentativeLastName(value: string) {
    this._legalRepresentativeLastName = value;
  }

  get legalRepresentativePhoneNumber(): string {
    return this._legalRepresentativePhoneNumber;
  }

  set legalRepresentativePhoneNumber(value: string) {
    this._legalRepresentativePhoneNumber = value;
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

  get roomId(): number | null {
    return this._roomId;
  }

  set roomId(value: number | null) {
    this._roomId = value;
  }
}
