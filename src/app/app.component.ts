import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 
 switch:boolean;

 constructor() { }

 ngOnInit() { this.switch = false; }

}
 