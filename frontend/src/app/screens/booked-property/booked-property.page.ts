import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../services/property.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import {NavController} from '@ionic/angular';



@Component({
  selector: 'app-booked-property',
  templateUrl: './booked-property.page.html',
  styleUrls: ['./booked-property.page.scss'],
})
export class BookedPropertyPage implements OnInit {
  data: any;
  ApplicationId: any;
  Application_id: any;
  date: any;
  datee: any;

  isCardVisible: boolean = false;

  constructor(    private property: PropertyService,
    private authService: AuthService,
    private profile: ProfileService,
    private navController: NavController
    ) { }


  ngOnInit() {

    this.authService.userDataS.subscribe((res: any) => {
      this.ApplicationId = res.id;

    


        console.log("Application Data",this.ApplicationId);


        this.profile.profileById(this.ApplicationId).subscribe((response: any) => {
          this.Application_id = response.ApplicantId;
          console.log('Application Data current', this.Application_id);
          if(this.Application_id != null){
            this.isCardVisible = true
          }

          this.property.bookedProperty(this.Application_id).subscribe((response: any=[]) => {
            this.data = response;
            this.date = response.createdAt.split('T')
            this.datee= this.date[0].split('-')
            console.log(this.datee);
            
            console.log('Booked Property Data', this.data);
          });


        });
      
    });


     
  }

  back(){
    this.navController.back();
  }

  BookingId(BookingId: any) {
    throw new Error('Method not implemented.');
  }

}
