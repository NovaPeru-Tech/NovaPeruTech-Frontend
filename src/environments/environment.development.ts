export const environment = {
  production: false,
  platformProviderApiBaseUrl: 'http://localhost:8080/api/v1',
  // Hcm Bounded Context
  platformProviderContractsEndpointPath: '/contracts',
  platformProviderStaffEndpointPath:'/staff',

  platformProviderSignInEndpointPath:'/users',
  platformProviderSignUpEndpointPath:'/users',

  // Nursing Bounded Context
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
