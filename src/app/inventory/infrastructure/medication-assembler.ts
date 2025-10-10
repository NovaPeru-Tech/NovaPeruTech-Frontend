import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {Medication} from '../domain/medication.entity';
import {MedicationResource, MedicationResponse} from './medication-response';

export class MedicationAssembler implements BaseAssembler<Medication,MedicationResource, MedicationResponse>{
  toEntitiesFromResponse(response: MedicationResponse): Medication[] {
    return [];
  }

  toEntityFromResource(resource: MedicationResource): Medication {
    return new Medication({
      id:resource.id,
      name:resource.name,
      image:resource.image,
      type:resource.type,
      unit:resource.unit,
      expirationDate: new Date(resource.expirationDate),
    supplier:resource.supplier,
      unitCost:resource.unitCost,
      lastUpdate:new Date (resource.lastUpdate),
     quantity:resource.quantity,
     concentration:resource.concentration,
     pharmaceuticalForm:resource.pharmaceuticalForm,
     batchNumber:resource.batchNumber,
     administrationRoute:resource.administrationRoute,
      storageLocation:resource.storageLocation,
      minimumStock:resource.minimumStock,
      maximumStock:resource.maximumStock,
      requiresRefrigeration:resource.requiresRefrigeration,
      requiresPrescription:resource.requiresPrescription,
      contraindications:resource.contraindications,
      specialNotes:resource.specialNotes,
      barcode:resource.barcode,
      registrationNumber:resource.registrationNumber,
      storageConditions:resource.storageConditions,
       nursingHomeId:resource.nursingHomeId,
    });
  }

  toResourceFromEntity(entity: Medication): MedicationResource {
    return {
      id: entity.id,
      name: entity.name,
      image: entity.image,
      type: entity.type,
      unit: entity.unit,
      expirationDate: entity.expirationDate.toISOString(),
      supplier: entity.supplier,
      unitCost: entity.unitCost,
      lastUpdate: entity.lastUpdate.toISOString(),
      quantity: entity.quantity,
      concentration: entity.concentration,
      pharmaceuticalForm: entity.pharmaceuticalForm,
      batchNumber: entity.batchNumber,
      administrationRoute: entity.administrationRoute,
      storageLocation: entity.storageLocation,
      minimumStock: entity.minimumStock,
      maximumStock: entity.maximumStock,
      requiresRefrigeration: entity.requiresRefrigeration,
      requiresPrescription: entity.requiresPrescription,
      contraindications: entity.contraindications,
      specialNotes: entity.specialNotes,
      barcode: entity.barcode,
      registrationNumber: entity.registrationNumber,
      storageConditions: entity.storageConditions,
      nursingHomeId: entity.nursingHomeId,
    }  as MedicationResource;
  }

}
