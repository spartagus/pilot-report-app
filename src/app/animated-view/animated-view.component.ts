import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animated-view',
  templateUrl: './animated-view.component.html',
  styleUrls: ['./animated-view.component.scss']
})
export class AnimatedViewComponent implements OnInit {

  title = 'Pilot report app';
  bgcImg;

  constructor(){}

  ngOnInit(){
    this.bgcImg = 'assets/images/ang4.jpeg';
   }

  onBgc(input: HTMLInputElement){

  	const files = input.files;
    if (files && files.length) {
      let tempData = this;
      let len = files[0].name.length;
      let filetype = files[0].name.split(".");

      console.log("Filename: " + files[0].name); 
      console.log("Type: " + filetype[1]);
      console.log("Size: " + files[0].size + " bytes");

      //const bgcImg = files[0];

      //console.log("bgcImg: " +bgcImg);

      const fileToRead = files[0];

      const fileReader = new FileReader();
      fileReader.onload = function(fileLoadedEvent){
        
          tempData.bgcImg = fileReader.result;
          //tempData.csvInput();
          tempData.test();
               
      };
      fileReader.readAsDataURL(files[0]);
    }      
  }
test(){
	console.log("bgcImg: " + this.bgcImg);
}



}
