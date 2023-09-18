import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../services/property.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { Network, ConnectionStatus } from '@capacitor/network';
import { ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {
  project_id: any;
  project_name: any;
  Poject_address: any;

  id: any;

  data: any;
  dataa: any;

  property_Data: any;
  quarter_Data: any = [];
  AllQuarters: any;
  Check: any = [];

  filterQuarter_Data: any;

  isSelected: boolean = false;

  Booking_flag: any;

  a: any;

  pdfObj: any;
  postData: any;
  flag: any;
  bookingProcess: any;
  BOOKING_ID: any;
  alertController: any;

  showProperty: any;
  Property_id: any;

  networkStatus: ConnectionStatus | undefined;

  constructor(
    private property: PropertyService,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private alertControllerr: AlertController,

    private router: Router,
    private toastController: ToastController,
    private location: Location
  ) {}

  ngOnInit() {
  
    this.network();

    //Ig Getting from Feed Page

    this.project_id = history.state.data;

    console.log('Project id', this.project_id);

    this.property.projectId(this.project_id).subscribe((response: any) => {
      this.data = response;
      console.log('Project Data', this.data);
    });

    this.property
      .propertyById(this.project_id)
      .subscribe((response: any = []) => {
        this.property_Data = response;
        console.log(this.property_Data);

        if(this.property_Data.length == 0)
                  {
                    console.log("update the project flag"); 
                    console.log("project id",this.project_id); 



                    this.postData = {
                      Project_flag: (this.flag = false),
                    };
                
                    this.property.projectFlag(this.project_id, this.postData)
                      .subscribe((res: any) => {
                        console.log('property flag', res);
                      }
                        )



                    
                  }


        // for (let i=0; i<this.property_Data.length; i++)
        //         {
        //           console.log(this.property_Data[i].length);
        //           // if(this.quarter_Data[i].length == 0)
        //           // {
        //           //   console.log("update the data",this.quarter_Data[i]); 
                    
        //           // }
 
        //         }



        
        for (let i = 0; i < this.property_Data.length; i++) {
          console.log('Property P_ID', this.property_Data[i].P_id);
          this.property
            .quarterById(this.property_Data[i].P_id)
            .subscribe((response: any) => {
              this.Check = response;
              this.quarter_Data.push(this.Check);
              console.log('Quarter Data', this.quarter_Data);




                for (let i=0; i<this.quarter_Data.length; i++)
                {
                  console.log(this.quarter_Data[i].length);
                  if(this.quarter_Data[i].length == 0)
                  {
                    console.log("update the data",this.quarter_Data[i]); 
                    
                  }
 
                }
            });
        }
      });

    this.filterQuarter_Data = this.quarter_Data;
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
    // window.location.reload();
  }

  onPropertyType(e: any) {
    let pID = e.target.value;
    console.log('Property P_id', pID);


    

    this.Property_id = pID;
    this.property.propertyById(pID).subscribe((response) => {
      this.showProperty = response;
      console.log('Property Data', this.showProperty);
    });
    this.property.quarterById(pID).subscribe((response: any) => {
      this.filterQuarter_Data = response;
      console.log('Quarter Filter DATA', this.filterQuarter_Data);
      if(this.filterQuarter_Data.length==0)
      {
        console.log("update flag");
        console.log('Property P_id', pID);



        this.postData = {
          Property_flag: (this.flag = false),
        };
    
        this.property.propertyFlag(pID, this.postData)
          .subscribe((res: any) => {
            console.log('property flag', res);
          }
            )




        
      }
      else{
        console.log("no update");
        
      }
      this.isSelected = true;
    });
  }

  Quarter_id(e: any) {
    let pID = e.target.value;
    console.log('Quarter id', pID);
    this.BOOKING_ID = pID;
    console.log('booking id', this.BOOKING_ID);
  }

  Book_Quarter() {
    console.log('booking process');
    this.postData = {
      Booking_flag: (this.flag = false),
    };

    this.property
      .BookQuarter(this.BOOKING_ID, this.postData)
      .subscribe((res: any) => {
        this.bookingProcess = res;
        console.log('booking Successfull', this.bookingProcess);

        console.log('Quarter id 112', this.BOOKING_ID);

        this.toastService.presentToast('YOUR PROPERTY BOOKED');

        this.ngOnInit();
      });
  }

  next() {
    if (this.BOOKING_ID == undefined) {
      // this.presentToastNoPropertySelect('top');
      this.presentAlertPropertySelect();
    }
    // this.router.navigate(['/home/application-form'])
    else {
      this.router.navigate(['home/application-form'], {
        state: {
          data: this.BOOKING_ID,
          dataa: this.project_id,
          dataaa: this.Property_id,
        },
      });
      // this.router.navigate(['home/application-form'],{state:{dataa:this.project_id}})
    }
  }

  async presentToastNoPropertySelect(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Select Property first...',
      color: 'warning',
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


  async presentAlertPropertySelect() {
    const alert = await this.alertControllerr.create({
      // header: 'Username or Password is incorrect...',
      subHeader: 'Please Choose your Property...',
      // message: 'Username or Password is i!',
      buttons: ['OK'],
    });

    await alert.present();
  }


}
