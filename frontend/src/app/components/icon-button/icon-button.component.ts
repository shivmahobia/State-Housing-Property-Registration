import { Component, Input,OnInit } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
})
export class IconButtonComponent  implements OnInit {


  constructor() { }

  ngOnInit() {}

  @Input() label: string | undefined;
  @Input() icon: string | undefined;

}
