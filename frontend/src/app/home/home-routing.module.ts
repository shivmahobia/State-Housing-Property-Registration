import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeGuard } from '../guards/home.guard';
import { UserDataResolver } from '../resolvers/userData.resolver';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    canActivate: [HomeGuard],
    resolve: {
      userData: UserDataResolver
    },
    children: [
      
      {
        path: '',
        loadChildren: () => 
        import('../screens/home/home.module').then (
          m => m.HomePageModule
        )
      },
      {
        path: 'profile',
        loadChildren: () => 
        import('../screens/profile/profile.module').then (
          m => m.ProfilePageModule
        )
      },
      {
        path: 'booked-property',
        loadChildren: () => 
        import('../screens/booked-property/booked-property.module').then (
          m => m.BookedPropertyPageModule
        )
      },
      {
        path: 'contact',
        loadChildren: () => 
        import('../screens/contact/contact.module').then (
          m => m.ContactPageModule
        )
      },
     
      {
        path: 'booking',
        loadChildren: () => 
        import('../screens/booking/booking.module').then (
          m => m.BookingPageModule
        )
      },
      {
        path: 'application-form',
        loadChildren: () => 
        import('../screens/application-form/application-form.module').then (
          m => m.ApplicationFormPageModule
        )
      },
      {
        path: 'upload-document',
        loadChildren: () => 
        import('../screens/upload-document/upload-document.module').then (
          m => m.UploadDocumentPageModule
        )
      },
      {
        path: 'payment',
        loadChildren: () => 
        import('../screens/payment/payment.module').then (
          m => m.PaymentPageModule
        )
      },
      {
        path: 'payment-success',
        loadChildren: () => 
        import('../screens/payment-success/payment-success.module').then (
          m => m.PaymentSuccessPageModule
        )
      },
      {
        path: 'payment-cancel',
        loadChildren: () => 
        import('../screens/payment-cancel/payment-cancel.module').then (
          m => m.PaymentCancelPageModule
        )
      },
      {
        path: 'aaa',
        loadChildren: () => 
        import('../screens/aaa/aaa.module').then (
          m => m.AaaPageModule
        )
      },
      // {
      //   path:'',
      //   redirectTo: '/home',
      //   pathMatch: 'full'
      // },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
