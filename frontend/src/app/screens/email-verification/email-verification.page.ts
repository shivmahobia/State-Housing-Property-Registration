import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';

import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.page.html',
  styleUrls: ['./email-verification.page.scss'],
})
export class EmailVerificationPage implements OnInit {

  email_id!: string;
  otp!: string;
  showOTP: boolean= false // Add this property
  User_id: any;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private toastController: ToastController,
    private alertController: AlertController,

    private location: Location,

    private router: Router
    ) {
   
  }
  ngOnInit(): void {
   
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      // header: 'Username or Password is incorrect...',
      subHeader: 'Email Not Found...',
      // message: 'Username or Password is i!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  myBackButton() {
    this.location.back();
  }
  

  sendOTP() {


    if (this.email_id) {
      console.log("email id",this.email_id);

        this.authService.forgot({"email_id": this.email_id}).subscribe((res: any=[]) => {

          if(res.length == 0){
            console.log("no email found")
            // this.presentToastEmailNotMatch('middle');
            this.presentAlert()

          }
          else{

            console.log(res);
            this.User_id=res[0].id
            console.log("user id is",this.User_id);
            
            

    // Send a request to your backend API to generate and send OTP via email

            this.http.post(environment.apiUrlGenerateOtp, { email: this.email_id })
            .subscribe(response => {
              console.log('OTP sent successfully');
              this.showOTP = true; // Update otpSent to true after sending OTP
            }, error => {
              console.error('Failed to send OTP', error);
            });

          }
          
        });
    } 
      // else {
      //  this.toastService.presentToast('please give some information');
      // }



   
  }

  verify() {
   
    // Send a request to your backend API to verify the OTP
    this.http.post(environment.apiUrlVerifyOtp, { email: this.email_id, otp: this.otp })
      .subscribe((response:any) => {
        if(response.status == 200){
          // console.log('Login Successfull');
          this.router.navigate(['/forgot-password'],{ state: {data: this.User_id },}); 
        }
        if(response.status == 400){
          console.log("Invalid otp");
          
        }
         
        // Proceed with user authentication and app navigation
      }, error => {
        console.error('Login failed', error);
      });
  }

  async presentToastEmailNotMatch(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'No Email Found!',
      color: 'danger',
      // duration: 3000,
      position: position,
      buttons: [
        // {
        //   side: 'end',
        //   icon: 'globe',
        //   handler: () => {
        //     console.log('');
        //   }
        // },

        {
          side: 'end',
          text: 'Close',
          role: 'cancel',
          handler: () => {
            console.log('');
          },
        },
      ],
    });

    await toast.present();
  }


}
