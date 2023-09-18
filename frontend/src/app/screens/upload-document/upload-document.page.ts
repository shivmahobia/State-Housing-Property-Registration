import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Network, ConnectionStatus } from '@capacitor/network';
import { ToastController } from '@ionic/angular';
import { Location } from '@angular/common';

import { PropertyService } from 'src/app/services/property.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.page.html',
  styleUrls: ['./upload-document.page.scss'],
})
export class UploadDocumentPage implements OnInit {
  image: File | any;
  signature: File | any;
  identity: File | any;
  address: File | any;
  income: File | any;
  caste: File | any;

  file: File | any;
  registerForm: FormGroup | any;
  Quarter_id: any;

  networkStatus: ConnectionStatus | undefined;

  Identity_Proof = undefined;
  Address_Proof = undefined;

  Identity_Proof_Document = [
    {
      type: 'Aadhaar Card',
    },
    {
      type: 'Passport',
    },
    {
      type: 'Pan Card',
    },
    {
      type: 'Voter I.D.',
    },
    {
      type: 'Driving Licence',
    },
    {
      type: 'Ration/PDS Photo Card',
    },
  ];

  Address_Proof_Document = [
    {
      type: 'Aadhaar Card',
    },
    {
      type: 'Passport',
    },
    {
      type: 'Pan Card',
    },
    {
      type: 'Voter I.D.',
    },
    {
      type: 'Driving Licence',
    },
    {
      type: 'Electricity Bill',
    },
  ];
  project_id: any;
  Property_id: any;
  applicationDocument: any;
  image_url: any;
  ApplicationId: any;
  postData: any;
  applicationUpdate: any;
  signature_url: any;
  identity_url: any;
  address_url: any;
  income_url: any;
  caste_url: any;
  image_url_data: any;
  ApplicationData: any;
  fileSelected: boolean = false;

  handleChangeIdentity(ev: any) {
    this.Identity_Proof = ev.target.value;
    console.log(this.Identity_Proof);
  }

  handleChangeAddress(ev: any) {
    this.Address_Proof = ev.target.value;
    console.log(this.Address_Proof);
  }

  getPhoto(event: any) {
    this.image = event.target.files[0];
  }
  getSignature(event: any) {
    this.signature = event.target.files[0];
  }
  getIdentity(event: any) {
    this.identity = event.target.files[0];
  }
  getAddress(event: any) {
    this.address = event.target.files[0];
  }
  getIncome(event: any) {
    this.income = event.target.files[0];
  }
  getCaste(event: any) {
    this.caste = event.target.files[0];
  }

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location,
    private property: PropertyService,
        private toastController: ToastController,

  ) {

    this.applicationDocument = this.fb.group({
       PhotoUrl: ['', [Validators.required, this.validateFileType]],
      SignatureUrl: ['', [Validators.required, this.validateFileType]],

      IdentityDocument: ['',Validators.required],
      IdentityDocumentNumber: ['',Validators.required],

      IdentityUrl: ['',[Validators.required, this.validateFileTypePdf]],

      AddressDocumentNumber: ['',Validators.required],
      AddressDocument: ['',Validators.required],
      
      AddressUrl: ['',[Validators.required, this.validateFileTypePdf]],
      IncomeUrl: ['',[Validators.required, this.validateFileTypePdf]],
      CasteUrl: ['',[Validators.required, this.validateFileTypePdf]]
      
    });
  }

  ngOnInit() {
        this.network();


    this.Quarter_id = history.state.data;
    this.project_id = history.state.dataa;
    this.Property_id = history.state.dataaa;
    this.ApplicationId = history.state.dataaaa;
    this.ApplicationData = history.state.dataaaaa

    console.log('project Id', this.project_id);
    console.log('Property Id', this.Property_id);
    console.log('quater Id', this.Quarter_id);
    console.log('Application Id', this.ApplicationId);
    console.log('Application Data', this.ApplicationData);

  }




  validateFileType(control:any) {
    const allowedExtensions = ['.jpg','.jpeg'];
    const file = control.value;
    const extension = file.substr(file.lastIndexOf('.')).toLowerCase();
    if (allowedExtensions.indexOf(extension) === -1) {
      return { invalidFileType: true };
    }
    return null;
  }

  validateFileTypePdf(control:any) {
    const allowedExtensions = ['.pdf'];
    const file = control.value;
    const extension = file.substr(file.lastIndexOf('.')).toLowerCase();
    if (allowedExtensions.indexOf(extension) === -1) {
      return { invalidFileType: true };
    }
    return null;
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


  myBackButton() {
    this.location.back();
  }

  submitData() {

    /////////////////////////////////


     let formData= new FormData()

     formData.append('image', this.image);
     formData.append('signature', this.signature);
     formData.append('identity', this.identity);
     formData.append('address', this.address);
     formData.append('income', this.income);
     formData.append('caste', this.caste);

     this.http.post(environment.apiUrlApplicationDocument,formData).subscribe(
      (response:any=[])=>{
       
        this.image_url=response.image
        this.signature_url=response.signature
        this.identity_url=response.identity
        this.address_url=response.address
        this.income_url=response.income
        this.caste_url=response.caste


        console.log(this.image_url);
        console.log(this.signature_url);
        console.log(this.identity_url);
        console.log(this.address_url);
        console.log(this.income_url);
        console.log(this.caste_url);



        this.postData = {
          IdentityDocument: this.applicationDocument.get('IdentityDocument').value,
          IdentityDocumentNumber: this.applicationDocument.get('IdentityDocumentNumber').value,
          AddressDocument: this.applicationDocument.get('AddressDocument').value,
          AddressDocumentNumber: this.applicationDocument.get('AddressDocumentNumber').value,
          PhotoUrl: this.image_url,
          SignatureUrl: this.signature_url,
          IdentityUrl: this.identity_url,
          AddressUrl: this.address_url,
          IncomeUrl: this.income_url,
          CasteUrl: this.caste_url,
        };
      
    
        this.property
          .ApplicationUpdate(this.ApplicationId, this.postData)
          .subscribe((res: any) => {
            this.applicationUpdate = res;
            console.log('Application data inserted successfully', this.applicationUpdate);
          });
        
        
        
      }, (error) => {
        console.log(error.message.value);
      }
     );



    console.log("ooookkkk",formData.getAll('image'),formData.getAll('signature'),formData.getAll('identity'),formData.getAll('address'),formData.getAll('income'),formData.getAll('caste'));
    
///////////////////////////////////////////



    
    this.router.navigate(['home/payment'], {
      state: {
        data: this.Quarter_id,
        dataa: this.project_id,
        dataaa: this.Property_id,
        dataaaa: this.ApplicationData,
        dataaaaa: this.ApplicationId
      },
    });

  }

  onSubmit() {
    console.log(this.registerForm.value);
  }

  loadImageFromDevice(event: any) {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.readAsArrayBuffer(file);

    reader.onload = () => {
      // get the blob of the image:
      let blob: Blob = new Blob([new Uint8Array(reader.result as ArrayBuffer)]);

      // create blobURL, such that we could use it in an image element:
      let blobURL: string = URL.createObjectURL(blob);
    };

    reader.onerror = (error) => {
      //handle errors
    };
  }

  payment() {
    this.router.navigate(['/home/payment'], {
      state: { data: this.Quarter_id }
    });
  }
}
