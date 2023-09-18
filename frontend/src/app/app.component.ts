import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { Stripe } from '@capacitor-community/stripe';
import { environment } from 'src/environments/environment';

import { ProfileService} from 'src/app/services/profile.service'




@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  id: any;
  user_img: any;
 


  toDisplay = true;
  displayUserData: any;
  user_username: any;
  user_email_id: any;

  toggleData() {
    this.toDisplay = !this.toDisplay;
  }


  constructor(private authService: AuthService,  private profile: ProfileService   ) 
  {
    Stripe.initialize({
      publishableKey: environment.stripe.publishableKey,
    });


     this.authService.userDataS.subscribe((res: any) => {
      this.id = res.id;

      if(res){
        // this.authService.getUserById(this.id).subscribe((res:any)=>{
        // console.log("side menu data",res);
        // this.displayUserData = res;

        this.profile.profileById(this.id).subscribe((res: any) => {
          this.displayUserData = res;
          console.log('User Profile data', this.displayUserData);


        this.user_img=this.displayUserData.img_url
        this.user_username=this.displayUserData.username
        this.user_email_id=this.displayUserData.email_id
         })
      }
    });


  }

  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Booked Property', url: '/home/booked-property', icon: 'business'},
    { title: 'Profile', url: '/home/profile', icon: 'person' },
    { title: 'Contact', url: '/home/contact', icon: 'call'},
    ];

  logoutAction() {
    this.authService.logout();
  }
}
