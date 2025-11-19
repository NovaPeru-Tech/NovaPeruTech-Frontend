export class CreateStaffMemberCommand {
  dni!: string;
  firstName!: string;
  lastName!: string;
  birthDate!: string;
  age!: number;
  emailAddress!: string;
  street!: string;
  number!: string;
  city!: string;
  postalCode!: string;
  country!: string;
  photo!: string;
  phoneNumber!: string;

  emergencyContactFirstName!: string;
  emergencyContactLastName!: string;
  emergencyContactPhoneNumber!: string;

  constructor(init?: Partial<CreateStaffMemberCommand>) {
    Object.assign(this, init);
  }
}
