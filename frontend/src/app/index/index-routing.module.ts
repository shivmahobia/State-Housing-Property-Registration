import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexGuard } from '../guards/index.guard';
import { IndexPage } from './index.page';

const routes: Routes = [
  {
    path: '',
    component: IndexPage,
    canActivate: [IndexGuard],
    children: [
      {
        path: '',
        loadChildren: () => 
        import('../screens/login/login.module').then (
          m => m.LoginPageModule
        )
      },
      {
        path: 'register',
        loadChildren: () => 
        import('../screens/register/register.module').then (
          m => m.RegisterPageModule
        )
      },
      {
        path: 'forgot-password',
        loadChildren: () => 
        import('../screens/forgot-password/forgot-password.module').then (
          m => m.ForgotPasswordPageModule
        )
      },
      {
        path: 'email-verification',
        loadChildren: () => 
        import('../screens/email-verification/email-verification.module').then (
          m => m.EmailVerificationPageModule
        )
      },

      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexPageRoutingModule {}
