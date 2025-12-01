export const environment = {
  production: false,
  platformProviderApiBaseUrl: 'http://localhost:8080/api/v1',

  // Analytics Bounded Context
  platformProviderAnalyticsStaffTerminationsEndpointPath: '/nursing-homes/{nursingHomeId}/analytics/staff/terminations',
  platformProviderAnalyticsStaffTerminationsByMonthEndpointPath: '/nursing-homes/{nursingHomeId}/analytics/staff/terminations/by-month',
  platformProviderAnalyticsStaffHiresEndpointPath: '/nursing-homes/{nursingHomeId}/analytics/staff/hires',
  platformProviderAnalyticsStaffHiresByMonthEndpointPath: '/nursing-homes/{nursingHomeId}/analytics/staff/hires/by-month',
  platformProviderAnalyticsResidentsAdmissionsEndpointPath: '/nursing-homes/{nursingHomeId}/analytics/residents/admissions',
  platformProviderAnalyticsResidentsAdmissionsByMonthEndpointPath: '/nursing-homes/{nursingHomeId}/analytics/residents/admissions/by-month',
  platformProviderAnalyticsResidentsAdmissionsByDateRangeEndpointPath: '/nursing-homes/{nursingHomeId}/analytics/residents/admissions/by-date-range',
  platformProviderAnalyticsResidentsActiveEndpointPath: '/nursing-homes/{nursingHomeId}/analytics/residents/active',

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
