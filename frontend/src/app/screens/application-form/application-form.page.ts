import { Directive, EventEmitter, Output,Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

import { AlertController } from '@ionic/angular';

import { ToastService } from 'src/app/services/toast.service';

import { Router } from '@angular/router';
import { Network, ConnectionStatus } from '@capacitor/network';
import { ToastController } from '@ionic/angular';
import { Location } from '@angular/common';


const nameRegex= /^[A-Za-z\s]+$/;

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.page.html',
  styleUrls: ['./application-form.page.scss'],
})
export class ApplicationFormPage implements OnInit {

  selectedDate!: string;
  dob: any;

  
  ApplicationForm: FormGroup;
  getjson: any;
  isSubmitted = true;

  isTypePassword: boolean = true;

  RX: any;

  Quarter_id: any;

  private isDisabled: boolean = false;
  project_id: any;
  Property_id: any;

  networkStatus: ConnectionStatus | undefined;

  Profession = undefined;
  BankName = undefined;
  Category = undefined;

  ProfessionDropdown = [
    {
      type: 'GOVERNMENT',
    },
    {
      type: 'SEMI-GOVERNMENT',
    },
    {
      type: 'PRIVATE',
    },
  ];

  BankNameDropdown = [
    {
      type: 'STATE BANK OF INDIA',
    },
    {
      type: 'ICICI BANK',
    },
    {
      type: 'HDFC BANK',
    },
    {
      type: 'DENA BANK',
    },
    {
      type: 'BANK OF BARODA',
    },
    {
      type: 'UCO BANK',
    },
  ];
  CategoryDropdown = [
    {
      type: 'Schedule Cast',
    },
    {
      type: 'Schedule Tribe',
    },
    {
      type: 'Other Backword Class',
    },
    {
      type: 'General',
    },
    {
      type: 'Freedom Fighter',
    },
    {
      type: 'Journalist',
    },
  ];
  touploadApplicationId: any;
  Dob: any;























  handleChangeProfession(ev: any) {
    this.Profession = ev.target.value;
    console.log(this.Profession);
  }
  handleChangeBank(ev: any) {
    this.BankName = ev.target.value;
    console.log(this.BankName);
  }
  handleChangeCategory(ev: any) {
    this.Category = ev.target.value;
    console.log(this.Category);
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastController: ToastController,

    private alertController: AlertController,
    private toastService: ToastService,
    private location: Location,

    private router: Router
  ) {

    
    this.ApplicationForm = this.fb.group({
      ApplicantId: [this.uniqueId(), Validators.required],
      Applicant_name: ['', [Validators.required,Validators.pattern(/^[a-zA-Z\s]*$/)]],
      FatherHusband_name: ['', [Validators.required,Validators.pattern(/^[a-zA-Z\s]*$/)]],
      DateOfBirth: ['',[Validators.required,Validators.pattern(/^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/)]],
      Applicant_age: ['',  Validators.compose([Validators.required,Validators.pattern(/^[0-9]*$/),Validators.maxLength(2),Validators.min(18)])],
      Mobile_number: ['',Validators.compose([Validators.required, Validators.pattern('^[6-9]{1}[0-9]{9}$'),Validators.maxLength(10)])],
      Email_id: ['', [Validators.required, Validators.email]],

      ContactHome_number: ['',Validators.compose([ Validators.pattern('^[6-9]{1}[0-9]{9}$'),Validators.maxLength(10)])],
      ContactOffice_number: ['', Validators.compose([ Validators.pattern('^[6-9]{1}[0-9]{9}$'),Validators.maxLength(10)])],
      // ContactHome_number: ['',Validators.compose([ Validators.pattern('^[6-9]{1}[0-9]{9}$'),Validators.maxLength(10)])],
      // ContactOffice_number: ['', Validators.compose([ Validators.pattern('^[6-9]{1}[0-9]{9}$'),Validators.maxLength(10)])],

      Correspondence_address: ['', Validators.required],
      Permanent_address: ['', Validators.required],
      Profession: ['', Validators.required],

      AnnualIncomeSelf: ['', [Validators.required,Validators.pattern("^[0-9,]*$")]],
      AnnualIncomeFamily: ['', [Validators.required,Validators.pattern("^[0-9,]*$")]],

      BankName: ['', Validators.required],
      AccountNumber: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9,]*$"),Validators.maxLength(10)])],
      BranchName: ['', [Validators.required,Validators.pattern(/^[a-zA-Z\s]*$/)]],
      
      IfscCode: [''],
      GST_number: [''],

      Category: ['', Validators.required],


      Nominee_name: ['', [Validators.required,Validators.pattern(/^[a-zA-Z\s]*$/)]],
      Nominee_age: ['',  Validators.compose([Validators.required,Validators.pattern(/^[0-9]*$/),Validators.maxLength(2),Validators.min(18)])],
      Nominee_number: ['',Validators.compose([Validators.required, Validators.pattern('^[6-9]{1}[0-9]{9}$'),Validators.maxLength(10)])],
      Nominee_relation: ['', [Validators.required,Validators.pattern(/^[a-zA-Z\s]*$/)]],
      Nominee_address: ['', Validators.required],
    });
  }


  ngOnInit() {
  
    this.network();


    this.Quarter_id = history.state.data;
    this.project_id = history.state.dataa;
    this.Property_id = history.state.dataaa;

    // this.project_id = history.state.dataa;

    console.log('Project Id', this.project_id);
    console.log('Property Id', this.Property_id);
    console.log('quater Id', this.Quarter_id);

    this.uniqueId();
  }

  onDateChange(event: any) {
     this.selectedDate = event.target.value.split('T')[0];
    console.log(this.selectedDate);

    // this.dob=this.selectedDate.split('T')
    // this.Dob=this.dob[0]
    // console.log(this.Dob);



  }


  // getAge(){
  //   const today = new Date();
  //   const birthdate = new Date('20/08/1999');
  //   let age = today.getFullYear() - birthdate.getFullYear();
  //   const month = today.getMonth() - birthdate.getMonth();
  //   if (month < 0 || (month === 0 && today.getDate() < birthdate.getDate())) {
  //     age--;
  //   }
  //   return age;
  // }


//   calculateAge(dateOfBirth: string): number {
//   const parts = dateOfBirth.split('/');
//   const birthDate = new Date(+parts[2], +parts[1] - 1, +parts[0]);
//   const today = new Date();
//   let age = today.getFullYear() - birthDate.getFullYear();
//   const monthDiff = today.getMonth() - birthDate.getMonth();
//   if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//     age--;
//   }
//   return age;
// }

  

 



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
    // window.location.reload();
  }

  uniqueId() {

    // input from the user
const RX = "";
const min = 10
const max = 999

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const lastTwoDigits = currentYear % 100;


// generating a random number
const ApplicationId = (RX+lastTwoDigits+Math.floor(Math.random() * (max - min + 1)) + min);

// display a random number
// console.log(`Random value between ${min} and ${max} is ${ApplicationId}`);
// this.touploadApplicationId=ApplicationId
return ApplicationId

    // const RX = 'R';

    // let shiv = RX + new Date().getDate();
    // let shiv0 = new Date().getMinutes();
    // let shiv1 = new Date().getSeconds();
    // let shiv2 = new Date().getMilliseconds();
    // let nutan = shiv + shiv1 + shiv2 + shiv0;
    // // console.log(nutan);
    // return nutan;
  }

  onChange() {
    this.isTypePassword = !this.isTypePassword;
  }




  
  SubmitData() {


    // this.ApplicationForm.patchValue({
    //   DateOfBirth : this.selectedDate
    // })


    console.log(this.ApplicationForm.value);
    
      this.authService
        .applicationForm(this.ApplicationForm.value)
        .subscribe((data: any) => {

          this.router.navigate(['home/upload-document'], {
            state: {
              data: this.Quarter_id,
              dataa: this.project_id,
              dataaa: this.Property_id,      
              dataaaa: this.ApplicationForm.get("ApplicantId")?.value,
              dataaaaa: this.ApplicationForm.value
            },
          });
        });




      

    // this.touploadApplicationId=this.uniqueId()
    // console.log(this.touploadApplicationId);

    // console.log("form value",this.ApplicationForm.get("ApplicantId")?.value);
    
    

    // this.router.navigate(['home/upload-document'], {
    //   state: {
    //     data: this.Quarter_id,
    //     dataa: this.project_id,
    //     dataaa: this.Property_id,      
    //     dataaaa: this.ApplicationForm.get("ApplicantId")?.value,
    //     dataaaaa: this.ApplicationForm.value
    //   },
    // });
    
    // this.presentAlert();
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

  // isValidInput(fieldName: any): boolean {
  //   return (
  //     this.registerForm.controls[fieldName].invalid &&
  //     (this.registerForm.controls[fieldName].dirty ||
  //       this.registerForm.controls[fieldName].touched)
  //   );
  // }

  clear() {
    this.ApplicationForm = this.fb.group({
      ApplicantId: [''],
      Applicant_name: [''],
      FatherHusband_name: [''],
      DateOfBirth: [''],
      Applicant_age: [''],
      Mobile_number: [''],
      Email_id: [''],
      ContactHome_number: [''],
      ContactOffice_number: [''],
      Correspondence_address: [''],
      Permanent_address: [''],
      Profession: [''],
      AnnualIncomeSelf: [''],
      AnnualIncomeFamily: [''],
      BankName: [''],
      AccountNumber: [''],
      BranchName: [''],
      IfscCode: [''],
      GST_number: [''],
      Category: [''],
      Nominee_name: [''],
      Nominee_age: [''],
      Nominee_number: [''],
      Nominee_relation: [''],
      Nominee_address: [''],
    });
  }

  loginpage() {
    this.router.navigate(['login']);
  }
}
