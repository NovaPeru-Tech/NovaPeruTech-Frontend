import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

/*
* @purpose: Interfaces for NursingHome API responses
* @description: These interfaces define the structure of the data received from the Nursing Home API, including individual nursing home resources and the overall response format.
* */

export interface NursingHomeResource extends BaseResource{
  id:number;
  businessProfileId: number;
}

/*
* @purpose: Interface for NursingHome API response
* @description: This interface extends the BaseResponse to include an array of NursingHomeResource objects, representing the data returned from the API.
* */

export interface NursingHomesResponse extends BaseResponse{
  nursingHome: NursingHomeResource[];
}
