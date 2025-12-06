export const environment = {
  production: false,
  platformProviderApiBaseUrl: 'https://backend-nova-peru-tech-hbafacahbreadea5.canadacentral-01.azurewebsites.net/api/v1',

  // Analytics Bounded Context
  platformProviderAnalyticsStaffTerminationsEndpointPath: '/nursing-homes/{nursingHomeId}/analytics/staff-terminations',
  platformProviderAnalyticsStaffHiresEndpointPath: '/nursing-homes/{nursingHomeId}/analytics/staff-hires',
  platformProviderAnalyticsResidentsAdmissionsEndpointPath: '/nursing-homes/{nursingHomeId}/analytics/residents-admissions',

  // Hcm Bounded Context
  platformProviderContractsEndpointPath: '/contracts',
  platformProviderStaffEndpointPath:'/staff',
  platformProviderStaffMemberContractsEndpointPath:'/staff/{staffMemberId}/contracts',
  platformProviderStaffMemberContractStatusEndpointPath:'/staff/{staffMemberId}/contracts/{contractId}',

  //IAM Bounded Context
  platformProviderSignInEndpointPath: '/authentication/sign-in',
  platformProviderSignUpEndpointPath: '/authentication/sign-up',
  platformProviderAdministratorsEndpointPath: '/administrators',

  // Nursing Bounded Context
  platformProviderAdministratorNursingHomesEndpointPath: '/administrators/{administratorId}/nursing-homes',
  platformProviderResidentRoomsEndpointPath: '/nursing-homes/{nursingHomeId}/rooms/{residentId}',
  platformProviderResidentMedicationsEndpointPath: '/residents/{residentId}/medications',
  platformProviderNursingHomeResidentsEndpointPath: '/nursing-homes/{nursingHomeId}/residents',
  platformProviderNursingHomeStaffEndpointPath: '/nursing-homes/{nursingHomeId}/staff',
  platformProviderNursingHomeRoomsEndpointPath: '/nursing-homes/{nursingHomeId}/rooms',
  platformProviderMedicationsEndpointPath:'/medications',
  platformProviderNursingHomesEndpointPath:'/nursing-homes',
  platformProviderResidentsEndpointPath:'/residents',
  platformProviderRoomsEndpointPath: '/rooms',

  // Profiles Bounded Context
  platformProviderBusinessProfilesEndpointPath: '/business-profiles',
  platformProviderPersonProfilesEndpointPath: '/person-profiles',
};
