import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

import { AlertController } from '@ionic/angular';

import { Router } from '@angular/router';

import { Network, ConnectionStatus } from '@capacitor/network';
import { ToastController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  getjson: any;
  isSubmitted = true;
  isTypePassword: boolean = true;
  networkStatus: ConnectionStatus | undefined;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router,
    private toastController: ToastController,
    private location: Location
  ) { 
    this.registerForm = this.fb.group({
      username: ['', [Validators.required,Validators.pattern(/^[a-zA-Z\s]*$/)]],
      email_id: ['', [Validators.required, Validators.email]],
      mobile_number: ['',Validators.compose([Validators.required, Validators.pattern('^[6-9]{1}[0-9]{9}$'),Validators.maxLength(10)])],
      password: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(30)]],
      c_password: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(30)]],
    });
  }

  ngOnInit() {
    this.network();
  }

  network() {
    if (Network) {
      Network.getStatus().then((status) => {
        this.networkStatus = status;
        if (this.networkStatus.connected == false) {
          console.log('No internet');
          this.presentToastNoInternet('top');
        }
      });
    }
  }

  myBackButton() {
    this.location.back();
  }

  async presentToastNoInternet(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'No Internet Connection...',
      color: 'danger',
      duration: 3000,
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

  onChange() {
    this.isTypePassword = !this.isTypePassword;
  }

  registerUser() {
    console.log(this.registerForm.value);

    if (this.registerForm.controls['password'].value != this.registerForm.controls['c_password'].value) 
    {
      //console.log('Password do not Match');
      // this.presentToastPasswordNotMatch('top');
      this.presentAlertPasswordNotMatch();
    } 
    
    else {
         this.authService
        .signup(this.registerForm.value)
        .subscribe((res: any) => {
          
          if (res.status == 400) {
            this.presentAlertSameMobileNUmber();            
          }
         
          else{
            this.presentAlert();
          this.clear();
          }
          
        });
    }

    // this.presentAlert();
  }


  async presentToastPasswordNotMatch(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Password not match...',
      color: 'danger',
      duration: 3000,
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

  async presentAlertPasswordNotMatch() {
    const alert = await this.alertController.create({
      // header: 'Username or Password is incorrect...',
      subHeader: 'Password and Confirm Password must be same...',
      // message: 'Username or Password is i!',
      buttons: ['OK'],
    });

    await alert.present();
  }





  async presentToastRegistration(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Registration Successfull...',
      color: 'success',
      duration: 3000,
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
  async presentToastSameMobileNumber(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'This Mobile number is already taken...',
      color: 'success',
      duration: 3000,
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

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Registration Successful',
      // subHeader: 'Important message',
      // message: 'This is an alert!',
      buttons: ['OK'],
    });

    await alert.present();
    this.clear();
  }

  async presentAlertSameMobileNUmber() {
    const alert = await this.alertController.create({
      header: 'This Mobile Number is Taken...',
      // subHeader: 'Important message',
      // message: 'This is an alert!',
      buttons: ['OK'],
    });

    await alert.present();
  }


  clear() {
    this.registerForm = this.fb.group({
      username: [''],
      email_id: [''],
      mobile_number: [''],
      password: [''],
      c_password: [''],
    });
  }

  loginpage() {
    this.router.navigate(['login']);
  }

}
