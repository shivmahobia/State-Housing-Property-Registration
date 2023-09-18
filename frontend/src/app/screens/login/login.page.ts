import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { AuthConstants } from 'src/app/config/auth-constants';
import { LoadingController } from '@ionic/angular';

import { Network, ConnectionStatus } from '@capacitor/network';
import { ToastController } from '@ionic/angular';
import { Location } from '@angular/common';

import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  isTypePassword: boolean = true;
  networkStatus: ConnectionStatus | undefined;
  token: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController,
    private location: Location,
    private menu: MenuController
  ) {
    this.form = new FormGroup({
      email_id: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
    });

    // this.menu.enable(false)
  }

  ngOnInit() {
    this.network();
  }

  shiv() {
    console.log('shiv is shiv');
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

  async presentAlert() {
    const alert = await this.alertController.create({
      // header: 'Username or Password is incorrect...',
      subHeader: 'Username or Password is incorrect...',
      // message: 'Username or Password is i!',
      buttons: ['OK'],
    });

    await alert.present();
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

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Username or password is incorrect',
      color: 'warning',
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

  myBackButton() {
    this.location.back();
  }

  onChange() {
    this.isTypePassword = !this.isTypePassword;
  }

  onSubmit() {
    this.authService.login(this.form.value).subscribe((res: any) => {
      if (res.status == 400) {
        console.log('wrong pass..');
        this.presentAlert()
      } else {
        this.storageService.store(AuthConstants.AUTH, res);
        this.token = res;
        this.router.navigate(['home'], {
          state: {
            data: this.token,
          },
        });
      }
    });
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Please Wait...',
    });

    loading.present();
  }
}
