export interface MedicationResource{
  id:number;
  name:string;
  image:string;
  type:string;
  unit:string;
  expirationDate: string;
  supplier:string;
  unitCost:number;
  lastUpdate:string;
  quantity:number;
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
}
export interface MedicationResponse {
  Medications:MedicationResource[];
}
