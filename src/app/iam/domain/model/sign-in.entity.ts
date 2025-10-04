/*
* @purpose: Entity for user sign-in data.
* @description: This class represents the data required for a user to sign in, including email and password.
* It provides a constructor to initialize these properties and getter/setter methods for accessing and modifying them.
* */
export class SignIn{
  private _id:number;
private _email: string;
private _password: string
  constructor(SignIn:{ id:number,email: string, password:string}) {
  this._id = SignIn.id;
    this._email = SignIn.email;
    this._password = SignIn.password;
  }

  /*
  * @purpose: Getters and Setters for email and password.
  * @description: These methods allow access and modification of the email and password properties of the SignIn entity.
  * */
  get email(): string {
    return this._email;
  }
  /*
  * @purpose: Setter for email.
  * @description: This method allows modification of the email property of the SignIn entity.
  * */
  set email(value: string) {
    this._email = value;
  }

  get password(){
    return this._password;
  }
  set password(value: string) {
    this._password = value;
  }

  get id(){
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }
}
