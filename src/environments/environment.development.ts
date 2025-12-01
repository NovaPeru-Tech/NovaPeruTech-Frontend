export const environment = {
  production: false,
  platformProviderApiBaseUrl: 'http://localhost:8080/api/v1',

  // Analytics Bounded Context
  platformProviderAnalyticsStaffTerminationsEndpointPath: '/nursing-homes/{nursingHomeId}/analytics/staff/terminations',
  platformProviderAnalyticsStaffHiresEndpointPath: '/nursing-homes/{nursingHomeId}/analytics/staff/hires',
  platformProviderAnalyticsResidentsAdmissionsEndpointPath: '/nursing-homes/{nursingHomeId}/analytics/residents/admissions',

  // Hcm Bounded Context
  platformProviderContractsEndpointPath: '/contracts',
  platformProviderStaffEndpointPath:'/staff',
  platformProviderStaffMemberContractsEndpointPath:'/staff/{staffMemberId}/contracts',

  //IAM Bounded Context
  platformProviderSignInEndpointPath: '/authentication/sign-in',
  platformProviderSignUpEndpointPath: '/authentication/sign-up',

  // Nursing Bounded Context
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
