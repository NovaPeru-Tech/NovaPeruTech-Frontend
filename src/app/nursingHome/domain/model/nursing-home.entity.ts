export class NursingHome

  /*
* @purpose: Represents a nursing home entity with properties such as id, name, ruc, phone number, address, description, and adminId.
* @description: This class encapsulates the details of a nursing home and provides getters and setters for each property.
* */

{
  private _id:number;
  private _name:string;
  private _ruc:string;
  private _phoneNumber:string;
  private _address:string;
  private _description:string;
  private _AdminId:number;
  constructor(nursingHome:{id:number,name:string,ruc:string,phoneNumber:string,address:string,description:string,adminId:number}) {
    this._id = nursingHome.id;
    this._name = nursingHome.name;
    this._phoneNumber = nursingHome.phoneNumber;
    this._address = nursingHome.address;
    this._AdminId = nursingHome.adminId;
    this._ruc = nursingHome.ruc;
    this._description = nursingHome.description;

  }

  /*
* @purpose: Getters and Setters for NursingHome properties.
* @description: These methods allow access and modification of the properties of the NursingHome entity.
* */

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get ruc(): string {
    return this._ruc;
  }

  set ruc(value: string) {
    this._ruc = value;
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  set phoneNumber(value: string) {
    this._phoneNumber = value;
  }

  get address(): string {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get adminId(): number {
    return this._AdminId;
  }

  set adminId(value: number) {
    this._AdminId = value;
  }
}
