export const environment = {
  production: true,

  apiUrl: 'http:// 192.168.55.207:5000/shiv/', //login,signup,logout,forgotPassword,update:id

  apiUrlProperty: 'http:// 192.168.55.207:5000/shiv/property/',
  apiUrlProject: 'http:// 192.168.55.207:5000/shiv/project/',
  apiUrlQuarter: 'http:// 192.168.55.207:5000/shiv/quarter/',
  apiUrlUpdateQuarter: 'http:// 192.168.55.207:5000/shiv/Updatequarter/',
  apiUrlUpdateProperty: 'http:// 192.168.55.207:5000/shiv/UpdateProperty/',
  apiUrlUpdateProject: 'http:// 192.168.55.207:5000/shiv/UpdateProject/',
  apiUrlQuarter_Qid: 'http:// 192.168.55.207:5000/shiv/quarter_Qid/',
  apiUrlProfileUpload: 'http:// 192.168.55.207:5000/shiv/profileUpload/',
  apiUrlFormdataUpload: 'http:// 192.168.55.207:5000/shiv/userDocuments/',
  apiUrlPayment: 'http:// 192.168.55.207:5000/shiv/payment/',
  apiUrlApplicationUpdate: 'http:// 192.168.55.207:5000/shiv/application-form/',
  apiUrlPropertByP_id: 'http:// 192.168.55.207:5000/shiv/propertyP_id/',
  apiUrlPaawordChange: 'http:// 192.168.55.207:5000/shiv/changePass/',
  apiUrlGenerateOtp: 'http:// 192.168.55.207:5000/generate-otp/',
  apiUrlVerifyOtp: 'http:// 192.168.55.207:5000/verify-otp/',
  apiUrlApplicationDocument: 'http:// 192.168.55.207:5000/shiv/userDocuments/',
  apiUrlPropertyAvailableUpdate: 'http:// 192.168.55.207:5000/shiv/UpdateAvaiblePropertyNo/',
  payment: 'http://192.168.55.207:5000/shiv/payments/',


  apiUrlUserProfileUpdate: 'http:// 192.168.55.207:5000/shiv/',
  apiUrlUserBookedProperty: 'http:// 192.168.55.207:5000/shiv/BookingDetails/',
  apiUrlEmailBookedProperty: 'http:// 192.168.55.207:5000/userbookedproperty/',


  stripe: {
    publishableKey:
      'YOUR STRIPE PUBLIC KEY',
    secretKey:
      'YOUR STRIPE SECRET KEY',
  },
};
