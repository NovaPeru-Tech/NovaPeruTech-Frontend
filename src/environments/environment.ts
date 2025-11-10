export const environment = {
  production: true,
  platformProviderApiBaseUrl: 'http://localhost:3000/api/v1',
  platformProviderSignInEndpointPath:'/users',
  platformProviderSignUpEndpointPath:'/users',

  // Nursing Bounded Context
  platformProviderNursingHomesEndpointPath:'/nursing-homes',
  platformProviderResidentsEndpointPath:'/residents',
  platformProviderRoomsEndpointPath: '/rooms',

  platformProviderEmployeeEndPoint:'/employee',
  platformProviderMedicationEndPoint:'/medications'
};
