export const environment = {
  production: false,

  apiUrl: 'http://localhost:5000/shiv/', //login,signup,logout,forgotPassword,update:id

  apiUrlProperty: 'http://localhost:5000/shiv/property/',
  apiUrlProject: 'http://localhost:5000/shiv/project/',
  apiUrlQuarter: 'http://localhost:5000/shiv/quarter/',
  apiUrlUpdateQuarter: 'http://localhost:5000/shiv/Updatequarter/',
  apiUrlUpdateProperty: 'http://localhost:5000/shiv/UpdateProperty/',
  apiUrlUpdateProject: 'http://localhost:5000/shiv/UpdateProject/',
  apiUrlQuarter_Qid: 'http://localhost:5000/shiv/quarter_Qid/',
  apiUrlProfileUpload: 'http://localhost:5000/shiv/profileUpload',
  apiUrlFormdataUpload: 'http://localhost:5000/shiv/userDocuments',
  apiUrlPayment: 'http://localhost:5000/shiv/payment',
  apiUrlApplicationUpdate: 'http://localhost:5000/shiv/application-form/',
  apiUrlPropertByP_id: 'http://localhost:5000/shiv/propertyP_id/',
  apiUrlPaawordChange: 'http://localhost:5000/shiv/changePass/',
  apiUrlGenerateOtp: 'http://localhost:5000/generate-otp',
  apiUrlVerifyOtp: 'http://localhost:5000/verify-otp',
  apiUrlApplicationDocument: 'http://localhost:5000/shiv/userDocuments',
  apiUrlPropertyAvailableUpdate: 'http://localhost:5000/shiv/UpdateAvaiblePropertyNo/',
  payment: 'http://localhost:5000/shiv/payments/',

  apiUrlUserProfileUpdate: 'http://localhost:5000/shiv/',
  apiUrlUserBookedProperty: 'http://localhost:5000/shiv/BookingDetails/',
  apiUrlEmailBookedProperty: 'http://localhost:5000/userbookedproperty/',


  stripe: {
    publishableKey:
      'YOUR STRIPE PUBLIC KEY',
    secretKey:
      'YOUR STRIPE SECRET KEY',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
