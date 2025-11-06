export class StaffMember {
  // Basic Information
  private _id: number;
  private _state: string;
  private _name: string;
  private _lastname: string;
  private _dni: string;
  private _birthDate: Date;
  private _age: number;
  private _nationality?: string;
  private _image: string;

  // Contact Information
  private _phoneNumber: string;
  private _email: string;
  private _address: string;

  // Employment Information
  private _contractDate: Date;
  private _contractEndDate?: Date;
  private _terminationDate?: Date;
  private _post: string;
  private _typeOfContract: string;
  private _workShift: string;

  // Professional Information
  private _certifications: string[];

  // Emergency Contacts
  private _emergencyContactName: string;
  private _emergencyContactPhone: string;

  constructor(staffMember: {
    id: number;
    state: string;
    name: string;
    lastname: string;
    dni: string;
    birthDate: Date;
    nationality?: string;
    phoneNumber: string;
    email: string;
    address: string;
    image: string;
    contractDate: Date;
    contractEndDate?: Date;
    terminationDate?: Date;
    post: string;
    typeOfContract: string;
    workShift: string;
    certifications: string[];
    emergencyContactName: string;
    emergencyContactPhone: string;
  }) {
    this._id = staffMember.id;
    this._state = staffMember.state;
    this._name = staffMember.name;
    this._lastname = staffMember.lastname;
    this._dni = staffMember.dni;
    this._birthDate = staffMember.birthDate;
    this._age = this.calculateAge(staffMember.birthDate);
    this._nationality = staffMember.nationality;
    this._phoneNumber = staffMember.phoneNumber;
    this._email = staffMember.email;
    this._address = staffMember.address;
    this._image = staffMember.image;
    this._contractDate = staffMember.contractDate;
    this._contractEndDate = staffMember.contractEndDate;
    this._terminationDate = staffMember.terminationDate;
    this._post = staffMember.post;
    this._typeOfContract = staffMember.typeOfContract;
    this._workShift = staffMember.workShift;
    this._certifications = staffMember.certifications;
    this._emergencyContactName = staffMember.emergencyContactName;
    this._emergencyContactPhone = staffMember.emergencyContactPhone;
  }

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


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get state(): string {
    return this._state;
  }

  set state(value: string) {
    this._state = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get lastname(): string {
    return this._lastname;
  }

  set lastname(value: string) {
    this._lastname = value;
  }

  get dni(): string {
    return this._dni;
  }

  set dni(value: string) {
    this._dni = value;
  }

  get birthDate(): Date {
    return this._birthDate;
  }

  set birthDate(value: Date) {
    this._birthDate = value;
    this._age = this.calculateAge(value);
  }

  get age(): number {
    return this._age;
  }

  get nationality(): string | undefined {
    return this._nationality;
  }

  set nationality(value: string | undefined) {
    this._nationality = value;
  }

  get image(): string {
    return this._image;
  }

  set image(value: string) {
    this._image = value;
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  set phoneNumber(value: string) {
    this._phoneNumber = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get address(): string {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
  }

  get contractDate(): Date {
    return this._contractDate;
  }

  set contractDate(value: Date) {
    this._contractDate = value;
  }

  get contractEndDate(): Date | undefined {
    return this._contractEndDate;
  }

  set contractEndDate(value: Date | undefined) {
    this._contractEndDate = value;
  }

  get terminationDate(): Date | undefined {
    return this._terminationDate;
  }

  set terminationDate(value: Date | undefined) {
    this._terminationDate = value;
  }

  get post(): string {
    return this._post;
  }

  set post(value: string) {
    this._post = value;
  }

  get typeOfContract(): string {
    return this._typeOfContract;
  }

  set typeOfContract(value: string) {
    this._typeOfContract = value;
  }

  get workShift(): string {
    return this._workShift;
  }

  set workShift(value: string) {
    this._workShift = value;
  }

  get certifications(): string[] {
    return this._certifications;
  }

  set certifications(value: string[]) {
    this._certifications = value;
  }

  get emergencyContactName(): string {
    return this._emergencyContactName;
  }

  set emergencyContactName(value: string) {
    this._emergencyContactName = value;
  }

  get emergencyContactPhone(): string {
    return this._emergencyContactPhone;
  }

  set emergencyContactPhone(value: string) {
    this._emergencyContactPhone = value;
  }
}
