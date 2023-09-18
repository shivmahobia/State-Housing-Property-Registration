import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';
import { ToastService } from 'src/app/services/toast.service';

import {
  ApplePayEventsEnum,
  GooglePayEventsEnum,
  PaymentFlowEventsEnum,
  PaymentSheetEventsEnum,
  Stripe,
} from '@capacitor-community/stripe';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { first, lastValueFrom } from 'rxjs';

import { Network, ConnectionStatus } from '@capacitor/network';
import { ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  Quarter_id: any;
  postData: any;
  flag: any;
  bookingProcess: any;

  // data: any = {
  //   name: 'Shiv kumar Mahobia',
  //   email: 'shivmahobia83@gmail.com',
  //   amount: 100,
  //   currency: 'inr',
  // };

  project_id: any;
  Property_id: any;
  project_data: any;
  property_data: any;
  quarter_data: any;

  networkStatus: ConnectionStatus | undefined;
  Quarter: any;

  public Quarter_Price: any =0;
  bb: any;
  amount: any;
  ApplicationData: any;
  ApplicationId: any;
  ApplicantName: any;
  ApplicantEmail: any;

  constructor(
    private property: PropertyService,
    private toastService: ToastService,
    private http: HttpClient,
    private router: Router,
    private location: Location,
    private toastController: ToastController
  ) {
    Stripe.initialize({
      publishableKey: environment.stripe.publishableKey,
    });
  }

  ngOnInit() {
    this.network();

    this.Quarter_id = history.state.data;
    this.project_id = history.state.dataa;
    this.Property_id = history.state.dataaa;
    this.ApplicationData = history.state.dataaaa
    this.ApplicationId = history.state.dataaaaa


    console.log('project Id', this.project_id);
    console.log('property P_Id', this.Property_id);
    console.log('quater Id', this.Quarter_id);

    console.log('Application name', this.ApplicationData.Applicant_name); //user name  email id
    console.log('Application email id', this.ApplicationData.Email_id); //user name  email id
    console.log('Application phone number', this.ApplicationData.Mobile_number); //user name  email id

    this.ApplicantName=this.ApplicationData.Applicant_name
    this.ApplicantEmail=this.ApplicationData.Email_id

    this.property.projectId(this.project_id).subscribe((response: any) => {
      this.project_data = response;
      console.log('Project Data', this.project_data);
    });

    this.property
      .propertyByP_Id(this.Property_id)
      .subscribe((response: any) => {
        this.property_data = response;
        console.log('Property Data', this.property_data);
      });

    this.property
      .quarterBy_Qid(this.Quarter_id)
      .subscribe((response: any = []) => {
        this.Quarter = response.Quarters;

        this.Quarter_Price = response.Quarters_Price; //price

        console.log('quarter Data', this.Quarter_id);
      });
  }



// shiv(){
 
    
//    this.amount = this.Quarter_Price
   
// }

// dataa: any = {
//   name: 'Shiv kumar Mahobia',
//   email: 'shivmahobia83@gmail.com',
//   amount: this.shiv(),
//   currency: 'inr',
// };
  

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

  myBackButton() {
    this.location.back();
  }

  Book_Quarter() {
    console.log('booking process');
    this.postData = {
      Booking_flag: (this.flag = false),
    };

    this.property
      .BookQuarter(this.Quarter_id, this.postData)
      .subscribe((res: any) => {
        this.bookingProcess = res;
        console.log('booking Successfull', this.bookingProcess);

        // console.log("Quarter id 112",this.BOOKING_ID);

        this.toastService.presentToast('YOUR PROPERTY BOOKED');

        this.ngOnInit();
      });
  }

  httpPost(body: any) {
    return this.http.post<any>(environment.apiUrlPayment, body).pipe(first());
  }

  async paymentSheet() {

   const data = {
      name: this.ApplicantName,
      email: this.ApplicantEmail,
      amount: this.Quarter_Price,
      currency: 'inr',
    };


    try {
      // be able to get event of PaymentSheet
      Stripe.addListener(PaymentSheetEventsEnum.Completed, () => {
        console.log('PaymentSheetEventsEnum.Completed');
      });

      // Connect to your backend endpoint, and get every key.
      const data$ = this.httpPost(data);

      const { paymentIntent, ephemeralKey, customer } = await lastValueFrom(
        data$
      );

      console.log('paymentIntent: ', paymentIntent);

      // prepare PaymentSheet with CreatePaymentSheetOption.
      await Stripe.createPaymentSheet({
        paymentIntentClientSecret: paymentIntent,
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        merchantDisplayName: 'Shiv Mahobia',
      });

      console.log('createPaymentSheet');
      // present PaymentSheet and get result.
      const result = await Stripe.presentPaymentSheet();
      console.log('result: ', result);
      if (result && result.paymentResult === PaymentSheetEventsEnum.Completed) {
        // Happy path
        this.router.navigate(['/home/payment-success'], {
          state: { data: this.Quarter_id,dataa:this.project_data,dataaa:this.property_data,dataaaa: this.ApplicationId ,dataaaaa:this.ApplicationData,dataaaaaa:this.Property_id,dataaaaaaa:paymentIntent},
        });

        this.splitAndJoin(paymentIntent);
      }

      if (result && result.paymentResult === PaymentSheetEventsEnum.Failed) {
        // Happy path
        this.router.navigate(['/home/payment-cancel']);

        this.splitAndJoin(paymentIntent);
      }
    } catch (e) {
      console.log(e);
    }
  }

  splitAndJoin(paymentIntent: any) {
    const result = paymentIntent.split('_').slice(0, 2).join('_');
    console.log(result);
    return result;
  }
}
