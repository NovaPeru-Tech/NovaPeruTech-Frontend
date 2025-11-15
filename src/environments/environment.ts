export const environment = {
  production: true,
  platformProviderApiBaseUrl: 'http://localhost:3000/api/v1',
  // Hcm Bounded Context
  platformProviderContractsEndpointPath: '/contracts',
  platformProviderStaffEndpointPath:'/staff',

  platformProviderSignInEndpointPath:'/users',
  platformProviderSignUpEndpointPath:'/users',

  // Nursing Bounded Context
  platformProviderMedicationsEndpointPath:'/medications',
  platformProviderNursingHomesEndpointPath:'/nursing-homes',
  platformProviderResidentsEndpointPath:'/residents',
  platformProviderRoomsEndpointPath: '/rooms',

  // Profiles Bounded Context
  platformProviderBusinessProfilesEndpointPath: '/business-profiles',
  platformProviderPersonProfilesEndpointPath: '/person-profiles',

  platformProviderMedicationEndPoint:'/medications'
};
