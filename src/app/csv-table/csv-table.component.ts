import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-csv-table',
  templateUrl: './csv-table.component.html',
  styleUrls: ['./csv-table.component.scss']
})
export class CsvTableComponent implements OnInit {

  csvtext:any;
  jsonData:any;
  header:Array<string>;

  constructor(){}

  ngOnInit(){ }

  onFileSelect(input: HTMLInputElement) {   
    const files = input.files;
    if (files && files.length) {
      let tempData = this;
      let len = files[0].name.length;
      let filetype = files[0].name.split(".");

      console.log("Filename: " + files[0].name); 
      console.log("Type: " + filetype[1]);
      console.log("Size: " + files[0].size + " bytes");

      const fileToRead = files[0];

      const fileReader = new FileReader();
      fileReader.onload = function(fileLoadedEvent){
        if(filetype[1] == 'csv'){
          tempData.csvtext = fileReader.result;
          tempData.csvInput();
        }
        else if(filetype[1] == 'json'){
          tempData.jsonData = JSON.parse(fileReader.result);
          tempData.jsonInput();
        }
        else{
          tempData.errorInput();
        }          
      };
      fileReader.readAsText(files[0]);
    }      
  }
     
  csvInput(){    
    this.jsonData = JSON.parse(this.csv2JSON(this.csvtext));
    this.header = Object.keys(this.jsonData[0]);  
    console.log("CSV : "+this.csvtext);
    console.log("JSON : "+this.csv2JSON(this.csvtext));      
    console.log("header : ===> "+this.header);
  }

  jsonInput(){    
    this.header = Object.keys(this.jsonData[0]);
    console.log("JSON : ===> "+JSON.stringify(this.jsonData));
    console.log("JSON.parse : ===> "+this.jsonData);    
    console.log("header : ===> "+this.header);
  }

  errorInput(){    
    this.header = null;
    this.jsonData = null;
    alert("Warning: input type is not csv / json type");
  }


  //var csv is the CSV file with headers
  csv2JSON(csv){
  	console.log("csv " +csv);
    var lines=csv.split("\n");
    console.log("lines " +lines);
    var result = []; 

    var headers=lines[0].split(",");
    
    for(var i=1;i<lines.length-1;i++){
      var obj = {};
      var currentline=lines[i].split(",");

      for(var j=0;j<currentline.length;j++){
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
                                                      
    }
   // return result; //JavaScript object
    return JSON.stringify(result); //JSON
  }
}

