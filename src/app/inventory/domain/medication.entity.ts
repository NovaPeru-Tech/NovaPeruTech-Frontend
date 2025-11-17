export class Medication {
  /*
   * @purpose: Represents a medication entity for nursing home inventory management
   * @description: This class encapsulates all relevant details of a medication including
   * identification, storage, administration, and control information
   */

  private _id: number;
  private _name: string;
  private _image: string;
  private _type: string;
  private _unit: string;
  private _expirationDate: Date;
  private _supplier: string;
  private _unitCost: number;
  private _lastUpdate: Date;
  private _quantity: number;
  private _concentration: string;
  private _pharmaceuticalForm: string;
  private _batchNumber: string;
  private _administrationRoute: string;
  private _storageLocation: string;
  private _minimumStock: number;
  private _maximumStock: number;
  private _requiresRefrigeration: boolean;
  private _requiresPrescription: boolean;
  private _contraindications: string[];
  private _specialNotes: string;
  private _barcode?: string;
  private _registrationNumber: string;
  private _storageConditions: string[];
  private _nursingHomeId: number;

  constructor(medication: {
    id: number;
    name: string;
    image: string;
    type: string;
    unit: string;
    expirationDate: Date;
    supplier: string;
    unitCost: number;
    lastUpdate: Date;
    quantity: number;
    concentration: string;
    pharmaceuticalForm: string;
    batchNumber: string;
    administrationRoute: string;
    storageLocation: string;
    minimumStock: number;
    maximumStock: number;
    requiresRefrigeration: boolean;
    requiresPrescription: boolean;
    contraindications: string[];
    specialNotes: string;
    barcode?: string;
    registrationNumber: string;
    storageConditions: string[];
    nursingHomeId: number;
  }) {
    this._id = medication.id;
    this._name = medication.name;
    this._image = medication.image;
    this._type = medication.type;
    this._unit = medication.unit;
    this._expirationDate = medication.expirationDate;
    this._supplier = medication.supplier;
    this._unitCost = medication.unitCost;
    this._lastUpdate = medication.lastUpdate;
    this._quantity = medication.quantity;
    this._concentration = medication.concentration;
    this._pharmaceuticalForm = medication.pharmaceuticalForm;
    this._batchNumber = medication.batchNumber;
    this._administrationRoute = medication.administrationRoute;
    this._storageLocation = medication.storageLocation;
    this._minimumStock = medication.minimumStock;
    this._maximumStock = medication.maximumStock;
    this._requiresRefrigeration = medication.requiresRefrigeration;
    this._requiresPrescription = medication.requiresPrescription;
    this._contraindications = medication.contraindications;
    this._specialNotes = medication.specialNotes;
    this._barcode = medication.barcode;
    this._registrationNumber = medication.registrationNumber;
    this._storageConditions = medication.storageConditions;
    this._nursingHomeId = medication.nursingHomeId;
  }

  /*
   * @purpose: Getters and Setters for Medication properties
   * @description: These methods allow access and modification of the properties of the Medication entity
   */

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

  get image(): string {
    return this._image;
  }

  set image(value: string) {
    this._image = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get unit(): string {
    return this._unit;
  }

  set unit(value: string) {
    this._unit = value;
  }

  get expirationDate(): Date {
    return this._expirationDate;
  }

  set expirationDate(value: Date) {
    this._expirationDate = value;
  }

  get supplier(): string {
    return this._supplier;
  }

  set supplier(value: string) {
    this._supplier = value;
  }

  get unitCost(): number {
    return this._unitCost;
  }

  set unitCost(value: number) {
    this._unitCost = value;
  }

  get lastUpdate(): Date {
    return this._lastUpdate;
  }

  set lastUpdate(value: Date) {
    this._lastUpdate = value;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(value: number) {
    this._quantity = value;
  }

  get concentration(): string {
    return this._concentration;
  }

  set concentration(value: string) {
    this._concentration = value;
  }

  get pharmaceuticalForm(): string {
    return this._pharmaceuticalForm;
  }

  set pharmaceuticalForm(value: string) {
    this._pharmaceuticalForm = value;
  }

  get batchNumber(): string {
    return this._batchNumber;
  }

  set batchNumber(value: string) {
    this._batchNumber = value;
  }

  get administrationRoute(): string {
    return this._administrationRoute;
  }

  set administrationRoute(value: string) {
    this._administrationRoute = value;
  }

  get storageLocation(): string {
    return this._storageLocation;
  }

  set storageLocation(value: string) {
    this._storageLocation = value;
  }

  get minimumStock(): number {
    return this._minimumStock;
  }

  set minimumStock(value: number) {
    this._minimumStock = value;
  }

  get maximumStock(): number {
    return this._maximumStock;
  }

  set maximumStock(value: number) {
    this._maximumStock = value;
  }

  get requiresRefrigeration(): boolean {
    return this._requiresRefrigeration;
  }

  set requiresRefrigeration(value: boolean) {
    this._requiresRefrigeration = value;
  }

  get requiresPrescription(): boolean {
    return this._requiresPrescription;
  }

  set requiresPrescription(value: boolean) {
    this._requiresPrescription = value;
  }

  get contraindications(): string[] {
    return this._contraindications;
  }

  set contraindications(value: string[]) {
    this._contraindications = value;
  }

  get specialNotes(): string {
    return this._specialNotes;
  }

  set specialNotes(value: string) {
    this._specialNotes = value;
  }

  get barcode(): string|undefined {
    return this._barcode;
  }

  set barcode(value: string) {
    this._barcode = value;
  }

  get registrationNumber(): string {
    return this._registrationNumber;
  }

  set registrationNumber(value: string) {
    this._registrationNumber = value;
  }

  get storageConditions(): string[] {
    return this._storageConditions;
  }

  set storageConditions(value: string[]) {
    this._storageConditions = value;
  }

  get nursingHomeId(): number {
    return this._nursingHomeId;
  }

  set nursingHomeId(value: number) {
    this._nursingHomeId = value;
  }

  /*
   * @purpose: Utility methods for medication management
   * @description: Helper methods for common medication operations
   */

  /**
   * Checks if the medication is expired
   * @returns true if the medication has expired
   */
  isExpired(): boolean {
    return new Date() > this._expirationDate;
  }

  /**
   * Checks if the medication stock is below minimum
   * @returns true if stock is below minimum threshold
   */
  isLowStock(): boolean {
    return this._quantity < this._minimumStock;
  }

  /**
   * Checks if the medication is about to expire (within 30 days)
   * @returns true if expiration is within 30 days
   */
  isNearExpiration(): boolean {
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    return this._expirationDate <= thirtyDaysFromNow && !this.isExpired();
  }

  /**
   * Calculates the total value of the medication in stock
   * @returns total value (quantity * unit cost)
   */
  getTotalValue(): number {
    return this._quantity * this._unitCost;
  }

  /**
   * Gets a status badge for the medication based on expiration and stock
   * @returns status string: 'expired', 'near-expiration', 'low-stock', or 'ok'
   */
  getStatus(): string {
    if (this.isExpired()) return 'expired';
    if (this.isNearExpiration()) return 'near-expiration';
    if (this.isLowStock()) return 'low-stock';
    return 'ok';
  }
}


