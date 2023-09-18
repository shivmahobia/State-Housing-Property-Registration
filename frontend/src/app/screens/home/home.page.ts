import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../services/property.service';
import { Router } from '@angular/router';
import { Network, ConnectionStatus } from '@capacitor/network';
import { ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
 
  term: any ;
  posts: any;
  currentProperty: any;
  networkStatus: ConnectionStatus | undefined;

  constructor(
    private property: PropertyService,
    private router: Router,
    private toastController: ToastController,
    private location: Location,
    private loadingCtrl: LoadingController,
  ) { }
    
  ngOnInit() {
      this.network();
      this.property.project().subscribe((response) => {
        // this.showLoading();
        this.posts = response;
        // this.loadingCtrl.dismiss();
        console.log(this.posts);
      });
  }
  
  handleChange(ev: any) {
      this.currentProperty = ev.target.value;
      console.log(this.currentProperty);
  }

  handleRefresh(event: any) {
      setTimeout(() => {
        window.location.reload();
        event.target.complete();
      }, 2000);
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

  Booking(id: any) {
    this.router.navigate(['/home/booking'], { state: { data: id } });
    console.log('Project id', id);
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Please Wait...',
    });
    loading.present();
  } 



}
