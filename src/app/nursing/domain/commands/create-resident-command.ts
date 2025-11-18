export class CreateResidentCommand {
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

  legalRepresentativeFirstName!: string;
  legalRepresentativeLastName!: string;
  legalRepresentativePhoneNumber!: string;

  emergencyContactFirstName!: string;
  emergencyContactLastName!: string;
  emergencyContactPhoneNumber!: string;

  constructor(init?: Partial<CreateResidentCommand>) {
    Object.assign(this, init);
  }
}
