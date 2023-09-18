import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./index/index.module').then(m => m.IndexPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'application-form',
    loadChildren: () => import('./screens/application-form/application-form.module').then( m => m.ApplicationFormPageModule)
  },
  {
    path: 'upload-document',
    loadChildren: () => import('./screens/upload-document/upload-document.module').then( m => m.UploadDocumentPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./screens/payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'payment-success',
    loadChildren: () => import('./screens/payment-success/payment-success.module').then( m => m.PaymentSuccessPageModule)
  },
  {
    path: 'payment-cancel',
    loadChildren: () => import('./screens/payment-cancel/payment-cancel.module').then( m => m.PaymentCancelPageModule)
  },
  {
    path: 'email-verification',
    loadChildren: () => import('./screens/email-verification/email-verification.module').then( m => m.EmailVerificationPageModule)
  },
  {
    path: 'booked-property',
    loadChildren: () => import('./screens/booked-property/booked-property.module').then( m => m.BookedPropertyPageModule)
  },
  {
    path: 'aaa',
    loadChildren: () => import('./screens/aaa/aaa.module').then( m => m.AaaPageModule)
  },

  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'folder/:id',
  //   loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  // },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./screens/home/home.module').then( m => m.HomePageModule)
  // },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./screens/login/login.module').then( m => m.LoginPageModule)
  // },
  // {
  //   path: 'register',
  //   loadChildren: () => import('./screens/register/register.module').then( m => m.RegisterPageModule)
  // },
  // {
  //   path: 'forgot-password',
  //   loadChildren: () => import('./screens/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  // },
  // {
  //   path: 'contact',
  //   loadChildren: () => import('./screens/contact/contact.module').then( m => m.ContactPageModule)
  // },
  // {
  //   path: 'booking',
  //   loadChildren: () => import('./screens/booking/booking.module').then( m => m.BookingPageModule)
  // },
  // {
  //   path: 'profile',
  //   loadChildren: () => import('./screens/profile/profile.module').then( m => m.ProfilePageModule)
  // },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },
  // {
  //   path: 'index',
  //   loadChildren: () => import('./index/index.module').then( m => m.IndexPageModule)
  // },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
