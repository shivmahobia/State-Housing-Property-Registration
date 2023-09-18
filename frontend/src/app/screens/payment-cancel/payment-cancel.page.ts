import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-payment-cancel',
  templateUrl: './payment-cancel.page.html',
  styleUrls: ['./payment-cancel.page.scss'],
})
export class PaymentCancelPage implements OnInit {

  constructor( private property: PropertyService,
    private router: Router) { }

  ngOnInit() {

    setTimeout(() => {
      this.router.navigateByUrl('home');
      this.router.navigate(['home']).then(() => {
        window.location.reload();
      });      }, 3000);


  }

  backHome(){
    this.router.navigateByUrl('home') 
    this.router.navigate(['home'])
  .then(() => {
    window.location.reload();
  });
  }

}
