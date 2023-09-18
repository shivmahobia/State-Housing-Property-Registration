import { Component, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';

import { HttpClient } from '@angular/common/http';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { lastValueFrom } from 'rxjs';
// import { ApiService } from '../../services/api.service';
import { ToastService } from 'src/app/services/toast.service';

import { UpdateService } from 'src/app/services/update.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormControl } from '@angular/forms';

import { Network, ConnectionStatus } from '@capacitor/network';
import { ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';

import { AlertController } from '@ionic/angular';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  id: any;
  data: any;

  networkStatus: ConnectionStatus | undefined;
  User_Id: any;

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.fetchUpload();
      event.target.complete();
    }, 2000);
  }

  private fetchUpload() {
    this.profile
      .profileById((this.id = this.displayUserData.id))
      .subscribe((response) => {
        this.data = response;
        console.log('response data', this.data);
      });
  }

  displayUserData: any;

  image: any;
  postData: any;

  public imgData: any;

  // img_url: any

  // getimg :any

  toDisplay = true;

  toggleData() {
    this.toDisplay = !this.toDisplay;
  }

  constructor(
    public fb: FormBuilder,
    private authservice: AuthService,
    private profile: ProfileService,
    private http: HttpClient,
    private alertController: AlertController,

    // private registerApi: ApiService,
    private toastService: ToastService,
    private update: UpdateService,
        private router: Router,
    private toastController: ToastController,
    private location: Location
  ) {}

  ngOnInit() {
    this.network();

    
    this.authservice.userDataS.subscribe((res: any) => {
      this.User_Id = res.id;

      this.profile.profileById(this.User_Id).subscribe((res: any) => {
        this.displayUserData = res;
        console.log('User Profile', this.displayUserData);

       })

    });
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

   myBackButton(){
    this.location.back();
  }


  
  async takePicture() {
    try {
      if (Capacitor.getPlatform() != 'web') await Camera.requestPermissions();
      const image = await Camera.getPhoto({
        quality: 90,
        // allowEditing: false,
        source: CameraSource.Prompt,
        width: 600,
        resultType: CameraResultType.DataUrl,
      });
      console.log('image: ', image);
      this.image = image.dataUrl;
      const blob = this.dataURLtoBlob(image.dataUrl);
      const imageFile = new File([blob], 'profile.png', { type: 'image/png' });
      console.log(imageFile);
      let postData = new FormData();
      postData.append('photo', imageFile, 'profile.png');
      const data$ = this.http.post<any>(environment.apiUrlProfileUpload,postData);
      const response = await lastValueFrom(data$);
      console.log('post res', response.profile_url);
      this.imgData = response.profile_url;
      // console.log(this.imgData);
      // console.log("form data",this.imgUrl.value);
      console.log('img data', this.imgData);
    } catch (e) {
      console.log(e);
    }


  
    this.updateAction()

  }

  dataURLtoBlob(dataurl: any) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  updateAction() {
    this.postData = {
      img_url: this.imgData,
    };

    if(this.postData != undefined){
       this.update
      .update(this.displayUserData.id, this.postData)
      .subscribe((res: any) => {
        if (res) {
          console.log(res);
          console.log('Image is in database', this.displayUserData.id);
          // this.presentAlertProfileUpdated();

        } else {
          this.toastService.presentToast('incorrect username or password');
        }
      });
    }
    else{
      this.toastService.presentToast('Please choose img');

    }
   
  }



  async presentToastProfileUpdated(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Profile Updated...',
      color: 'success',
      duration: 3000,
      position: position,
      buttons: [

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


  async presentAlertProfileUpdated() {
    const alert = await this.alertController.create({
      // header: 'Username or Password is incorrect...',
      subHeader: 'Profile Updated...',
      // message: 'Username or Password is i!',
      buttons: ['OK'],
      
    });

    await alert.present();
  }


  
}
