import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { PropertyService } from 'src/app/services/property.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService} from 'src/app/services/profile.service'

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.page.html',
  styleUrls: ['./payment-success.page.scss'],
})
export class PaymentSuccessPage implements OnInit {
  Quarter_id: any;
  postData: any;
  flag: any;
  bookingProcess: any;
  Project_Name: any;
  Property_Name: any;
  project_data: any;
  property_data: any;
  Quarter_data: any;
  QuarterPrice_data: any;
  ApplicationId: any;
  bookingData: any;
  id: any;
  displayUserData: any;
  ApplicationData: any;
  ApplicantName: any;
  ApplicantEmail: any;
  ApplicantMobile: any;
  Property_id: any;
  property_dataa: any;
  AvailbelProperty: any;
  updateAvailabelProperty: any;
  UpdateAvailabelPropertyData: any;
  transaction_id: any;

  constructor(
    private property: PropertyService,
    private toastService: ToastService,
    private router: Router,
    private http: HttpClient,

    private authService: AuthService,
    private update: ProfileService,
    private fb: FormBuilder,
    private navCtrl: NavController

  ) {


    this.authService.userDataS.subscribe((res: any) => {
      this.id = res.id;

      if(res){
          this.authService.getUserById(this.id).subscribe((res:any)=>{
        console.log("payment page data",res);
        this.displayUserData = res.id;
        console.log("user id", this.displayUserData);
        console.log(this.ApplicationId);

this.update.Updateprofile( this.displayUserData,{ApplicantId:this.ApplicationId}).subscribe((res:any)=>{
  console.log(res);
  
})



         })
      }
    });


  }

  ngOnInit() {
    this.Project_Name = history.state.dataaa;
    this.Property_Name = history.state.dataa;
    this.Quarter_id = history.state.data;
    this.ApplicationId = history.state.dataaaa
    this.ApplicationData = history.state.dataaaaa
    this.Property_id   = history.state.dataaaaaa
    this.transaction_id = history.state.dataaaaaaa

    console.log(this.ApplicationData);
    
    this.ApplicantName=this.ApplicationData.Applicant_name
    this.ApplicantEmail=this.ApplicationData.Email_id
    this.ApplicantMobile=this.ApplicationData.Mobile_number






    // console.log('property data', this.Project_Name[0].Property_type);
    // console.log('project data', this.Property_Name.Project_name);
    console.log('Application Id', this.ApplicationId);
    // // console.log("Quarter data",this.Quarter_id);

this.project_data=this.Property_Name.Project_name
this.property_data=this.Project_Name[0].Property_type

    this.postData = {
      Booking_flag: (this.flag = false),
    };

    this.property
      .BookQuarter(this.Quarter_id, this.postData)
      .subscribe((res: any) => {
        this.bookingProcess = res;
        console.log('booking Successfull', this.bookingProcess);
        // console.log('Quarter ', this.bookingProcess.Quarters);
        // console.log('Quarter price ', this.bookingProcess.Quarters_Price);

        this.Quarter_data=this.bookingProcess.Quarters
        this.QuarterPrice_data=this.bookingProcess.Quarters_Price


        console.log("project",this.project_data);
        console.log("property",this.property_data);
        console.log("Quarter",this.Quarter_data);
        console.log("Quarter Price",this.QuarterPrice_data);
        

        // console.log("Quarter id 112",this.BOOKING_ID);
        // this.toastService.presentToast('YOUR PROPERTY BOOKED');

     this.bookingData = {
      Project_Data:this.project_data,
      Property_Data:this.property_data,
      Quarter_Data:this.Quarter_data,
      Quarter_Price:this.QuarterPrice_data
     }

     console.log("shiv data",this.bookingData);
     


     this.property
          .ApplicationUpdate(this.ApplicationId, this.bookingData)
          .subscribe((res: any) => {
            console.log('payment Application data inserted successfully',res);
          });



          const bookedPropertyData = {
            email: this.ApplicantEmail,
            ApplicantName: this.ApplicantName,
            ApplicantPhone_number:this.ApplicantMobile,
            project:this.project_data,
            property:this.property_data,
            Quarter:this.Quarter_data,
            Quarter_Price:this.QuarterPrice_data
            }
      
            console.log(bookedPropertyData);
            
      
      
            this.http.post(environment.apiUrlEmailBookedProperty, bookedPropertyData)
            .subscribe(response => {
              console.log('send Booked Property Details',response);
            }, error => {
              console.error('Failed to send Booked Property Details', error);
            });


            
              const result = this.transaction_id.split('_').slice(0, 2).join('_');
              console.log(result);
              
            


 
            const PaymentData = {
              Application_id:this.ApplicationId,
              ApplicantName: this.ApplicantName,
              ApplicantPhone_number:this.ApplicantMobile,
              email: this.ApplicantEmail,
              project:this.project_data,
              property:this.property_data,
              Quarter:this.Quarter_data,
              Quarter_Price:this.QuarterPrice_data,
              payment_id:result
              }

              this.http.post(environment.payment, PaymentData)
              .subscribe(response => {
                console.log('Payments details in database',response);
              }, error => {
                console.error('Failed to send Payment details to database', error);
              });




              // console.log(PaymentData);
              


      });





      this.property
      .propertyByP_Id(this.Property_id)
      .subscribe((response: any=[]) => {
        this.property_dataa = response;
        console.log('Property Data', this.property_dataa);

        this.AvailbelProperty = response[0].Property_available

        this.updateAvailabelProperty = this.AvailbelProperty - 1



        console.log(this.AvailbelProperty);
        console.log(this.updateAvailabelProperty);
        

        this.UpdateAvailabelPropertyData = {
          Property_available:this.updateAvailabelProperty
          
         }
    

         if(this.AvailbelProperty != 0){
           this.property.ProperyAvailableUpdate(this.Property_id, this.UpdateAvailabelPropertyData )
          .subscribe((res: any) => {
            console.log('Number of Property Updated',res);
          });
         }

      });










      // setTimeout(() => {
      //   // this.router.navigateByUrl('home');
      //   this.router.navigate(['home']).then(() => {
      //     window.location.reload();
      //   });      }, 3000);
      
    }
     
    backHome(){
      this.router.navigateByUrl('home') 
      this.router.navigate(['home'])
    .then(() => {
      window.location.reload();
    });
    }


  }

  
