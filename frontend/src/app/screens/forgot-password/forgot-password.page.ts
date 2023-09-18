import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

import { AlertController } from '@ionic/angular';

import { Router } from '@angular/router';

import { Network, ConnectionStatus } from '@capacitor/network';
import { ToastController } from '@ionic/angular';
import { Location } from '@angular/common';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  ForgetPassword: FormGroup;
  getjson: any;
  isSubmitted = true;
  isTypePassword: boolean = true;
  networkStatus: ConnectionStatus | undefined;
  User_id: any;
  data: any=[];


  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router,
    private toastController: ToastController,
    private location: Location
  ) { 
    this.ForgetPassword = this.fb.group({
      password: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(30)]],
      c_password: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(30)]],
    });
  }

  ngOnInit() {
    this.network();
    this.User_id = history.state.data;
    console.log(this.User_id);
    

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

  forgetPassword() {
    console.log(this.ForgetPassword.value);

    if (this.ForgetPassword.controls['password'].value != this.ForgetPassword.controls['c_password'].value) 
    {
      //console.log('Password do not Match');
      // this.presentToastPasswordNotMatch('top');
      this.presentAlertPasswordNotMatch();
    } 
    
    else {
      this.data = {
        password: this.ForgetPassword.controls['password'].value
      }
    console.log("form value",this.data);
    
      this.http.put(environment.apiUrlPaawordChange+this.User_id,this.data)
      .subscribe((response:any) => {

        if(response){
                  console.log(response);

          // this.presentToastPasswordChanged('top');
          this.presentAlertPasswordChanged();
        this.router.navigate(['/']); 
        }
        


        
      }, error => {
        console.error('failed to change pass..', error);
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
      subHeader: 'Password not match...',
      // message: 'Username or Password is i!',
      buttons: ['OK'],
    });

    await alert.present();
  }


  async presentToastPasswordChanged(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Password Changed Successfully..',
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
  async presentAlertPasswordChanged() {
    const alert = await this.alertController.create({
      // header: 'Username or Password is incorrect...',
      subHeader: 'Password Changed Successfully...',
      // message: 'Username or Password is i!',
      buttons: ['OK'],
    });

    await alert.present();
  }



  clear() {
    this.ForgetPassword = this.fb.group({
      password: [''],
      c_password: [''],
    });
  }

  loginpage() {
    this.router.navigate(['login']);
  }

}
