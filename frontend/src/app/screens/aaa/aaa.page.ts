import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aaa',
  templateUrl: './aaa.page.html',
  styleUrls: ['./aaa.page.scss'],
})
export class AaaPage implements OnInit {
  selectedDate!: string;
  dob: any;

  constructor() { }

  ngOnInit() {
  }


  onDateChange(event: any) {
    this.selectedDate = event.target.value;
    console.log(this.selectedDate);
    this.dob=this.selectedDate.split('T')
    console.log(this.dob[0]);
    
    
    
  }

}
