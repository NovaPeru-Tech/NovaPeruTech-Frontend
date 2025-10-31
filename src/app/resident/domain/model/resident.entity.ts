/**
 * Represents a resident with personal, medical, mobility, contact, and legal information.
 * This class encapsulates all relevant data for managing residents in a care or facility system.
 */
export class Resident {
  // Basic Information
  private _id: number;
  private _state: string;
  private _name: string;
  private _lastname: string;
  private _dni: string;
  private _birthDate: Date;
  private _age: number;
  private _image: string;

  // Location
  private _room: string;

  // Resident Contact
  private _phoneNumber: string;
  private _email: string;

  // Critical Medical Information
  private _bloodType: string;
  private _allergies?: string;
  private _chronicDiseases: string[];
  private _currentMedications?: string;
  private _specialDiet?: string;

  // Mobility and Dependency
  private _mobilityLevel: string;
  private _dependencyLevel: string;
  private _needsBathingAssistance: boolean;
  private _needsFeedingAssistance: boolean;
  private _needsDressingAssistance: boolean;

  // Emergency Contacts
  private _emergencyContactName: string;
  private _emergencyPhone: string;
  private _contactRelation: string;
  private _secondaryContact?: string;
  private _secondaryPhone?: string;

  // Administrative Information
  private _admissionDate: Date;
  private _attendingPhysician: string;
  private _medicalInsurance?: string;
  private _socialSecurityNumber?: string;

  // Legal Information
  private _legalGuardian?: string;
  private _guardianPhone?: string;

  constructor(resident: {
    id: number;
    state: string;
    name: string;
    lastname: string;
    dni: string;
    birthDate: Date;
    phoneNumber: string;
    email: string;
    bloodType: string;
    room: string;
    image: string;

    // New medical fields
    allergies?: string;
    chronicDiseases: string[];
    currentMedications?: string;
    specialDiet?: string;

    // New mobility fields
    mobilityLevel: string;
    dependencyLevel: string;
    needsBathingAssistance: boolean;
    needsFeedingAssistance: boolean;
    needsDressingAssistance: boolean;

    // New emergency contacts
    emergencyContactName: string;
    emergencyPhone: string;
    contactRelation: string;
    secondaryContact?: string;
    secondaryPhone?: string;

    // New administrative fields
    admissionDate: Date;
    attendingPhysician: string;
    medicalInsurance?: string;
    socialSecurityNumber?: string;

    // New legal fields
    legalGuardian?: string;
    guardianPhone?: string;
  }) {
    this._id = resident.id;
    this._state = resident.state;
    this._name = resident.name;
    this._lastname = resident.lastname;
    this._dni = resident.dni;
    this._birthDate = resident.birthDate;
    this._age = this.calculateAge(resident.birthDate);
    this._phoneNumber = resident.phoneNumber;
    this._email = resident.email;
    this._bloodType = resident.bloodType;
    this._room = resident.room;
    this._image = resident.image;

    // Medical information
    this._allergies = resident.allergies;
    this._chronicDiseases = resident.chronicDiseases;
    this._currentMedications = resident.currentMedications;
    this._specialDiet = resident.specialDiet;

    // Mobility and dependency
    this._mobilityLevel = resident.mobilityLevel;
    this._dependencyLevel = resident.dependencyLevel;
    this._needsBathingAssistance = resident.needsBathingAssistance;
    this._needsFeedingAssistance = resident.needsFeedingAssistance;
    this._needsDressingAssistance = resident.needsDressingAssistance;

    // Emergency contacts
    this._emergencyContactName = resident.emergencyContactName;
    this._emergencyPhone = resident.emergencyPhone;
    this._contactRelation = resident.contactRelation;
    this._secondaryContact = resident.secondaryContact;
    this._secondaryPhone = resident.secondaryPhone;

    // Administrative
    this._admissionDate = resident.admissionDate;
    this._attendingPhysician = resident.attendingPhysician;
    this._medicalInsurance = resident.medicalInsurance;
    this._socialSecurityNumber = resident.socialSecurityNumber;

    // Legal
    this._legalGuardian = resident.legalGuardian;
    this._guardianPhone = resident.guardianPhone;
  }

  /**
   * Calculates the current age of the resident based on birthdate.
   * @private
   * @param {Date} birthDate - The resident's birthdate.
   * @returns {number} Calculated age.
   */
  private calculateAge(birthDate: Date): number {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  }

  // --- Getters and Setters ---
  get id(): number { return this._id; }
  set id(value: number) { this._id = value; }

  get state(): string { return this._state; }
  set state(value: string) { this._state = value; }

  get name(): string { return this._name; }
  set name(value: string) { this._name = value; }

  get lastname(): string { return this._lastname; }
  set lastname(value: string) { this._lastname = value; }

  get dni(): string { return this._dni; }
  set dni(value: string) { this._dni = value; }

  get birthDate(): Date { return this._birthDate; }
  set birthDate(value: Date) {
    this._birthDate = value;
    this._age = this.calculateAge(value); // Recalculate age
  }

  get age(): number { return this._age; }

  get phoneNumber(): string { return this._phoneNumber; }
  set phoneNumber(value: string) { this._phoneNumber = value; }

  get email(): string { return this._email; }
  set email(value: string) { this._email = value; }

  get bloodType(): string { return this._bloodType; }
  set bloodType(value: string) { this._bloodType = value; }

  get room(): string { return this._room; }
  set room(value: string) { this._room = value; }

  get image(): string { return this._image; }
  set image(value: string) { this._image = value; }

  get allergies(): string| undefined { return this._allergies; }
  set allergies(value: string) { this._allergies = value; }

  get chronicDiseases(): string[] { return this._chronicDiseases; }
  set chronicDiseases(value: string[]) { this._chronicDiseases = value; }

  get currentMedications(): string | undefined { return this._currentMedications; }
  set currentMedications(value: string) { this._currentMedications = value; }

  get specialDiet(): string | undefined{ return this._specialDiet; }
  set specialDiet(value: string) { this._specialDiet = value; }

  get mobilityLevel(): string { return this._mobilityLevel; }
  set mobilityLevel(value: string) { this._mobilityLevel = value; }

  get dependencyLevel(): string { return this._dependencyLevel; }
  set dependencyLevel(value: string) { this._dependencyLevel = value; }

  get needsBathingAssistance(): boolean { return this._needsBathingAssistance; }
  set needsBathingAssistance(value: boolean) { this._needsBathingAssistance = value; }

  get needsFeedingAssistance(): boolean { return this._needsFeedingAssistance; }
  set needsFeedingAssistance(value: boolean) { this._needsFeedingAssistance = value; }

  get needsDressingAssistance(): boolean { return this._needsDressingAssistance; }
  set needsDressingAssistance(value: boolean) { this._needsDressingAssistance = value; }

  // New getters/setters - Emergency Contacts
  get emergencyContactName(): string { return this._emergencyContactName; }
  set emergencyContactName(value: string) { this._emergencyContactName = value; }

  get emergencyPhone(): string { return this._emergencyPhone; }
  set emergencyPhone(value: string) { this._emergencyPhone = value; }

  get contactRelation(): string { return this._contactRelation; }
  set contactRelation(value: string) { this._contactRelation = value; }

  get secondaryContact(): string | undefined { return this._secondaryContact; }
  set secondaryContact(value: string | undefined) { this._secondaryContact = value; }

  get secondaryPhone(): string | undefined { return this._secondaryPhone; }
  set secondaryPhone(value: string | undefined) { this._secondaryPhone = value; }

  get admissionDate(): Date { return this._admissionDate; }
  set admissionDate(value: Date) { this._admissionDate = value; }

  get attendingPhysician(): string { return this._attendingPhysician; }
  set attendingPhysician(value: string) { this._attendingPhysician = value; }

  get medicalInsurance(): string | undefined { return this._medicalInsurance; }
  set medicalInsurance(value: string | undefined) { this._medicalInsurance = value; }

  get socialSecurityNumber(): string | undefined { return this._socialSecurityNumber; }
  set socialSecurityNumber(value: string | undefined) { this._socialSecurityNumber = value; }

  get legalGuardian(): string | undefined { return this._legalGuardian; }
  set legalGuardian(value: string | undefined) { this._legalGuardian = value; }

  get guardianPhone(): string | undefined { return this._guardianPhone; }
  set guardianPhone(value: string | undefined) { this._guardianPhone = value; }
}
