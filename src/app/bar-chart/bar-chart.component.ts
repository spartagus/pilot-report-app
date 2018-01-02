
import { Component, OnInit, ViewChild, ElementRef, AfterContentInit, OnDestroy } from '@angular/core';

import { chart } from 'highcharts';
import { CsvTableComponent } from '../csv-table/csv-table.component';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, AfterContentInit, OnDestroy {

  jsonData:JSON;
  chartList;
  chartType:string;
  userinput:string;
  target:string = 'chartTarget';

  @ViewChild('chartTarget') chartTarget: ElementRef;
  chart: Highcharts.ChartObject;

  

  constructor() { }

  ngOnInit() {
  	this.chartType = 'bar';
  	this.chartList = ["bar","scatter","line","area","column","spline","areaspline","pie"];
  
  }

  ngAfterContentInit(){}

  demo(){
  	let demoData = JSON.stringify({
					"title": "Fruit Consumption",
					"xAxis": ["Apples", "Bananas", "Oranges"],
					"yAxis": "Fruit eaten",
					"series": [{
						"name": "Jane",
						"data": [1, 0, 4]
					}, {
						"name": "John",
						"data": [5, 7, 3]
					}, {
						"name": "spark",
						"data": [4, 2, 3]
					}, {
						"name": "prabu",
						"data": [7, 2, 1]
					}]
				});

	this.jsonData = JSON.parse(demoData);
	console.log("json:== "+this.jsonData);
	console.log("demoData:== "+demoData);
	this.loadChart();
  }

  changechart(userinput){
  	this.chartType = userinput;
  	this.loadChart();
  }

  loadChart(){
  	let instance = this;
  	let input = this.jsonData;
  	let series:Array<Object> = input['series'];
  	console.log("input['series']: " + input['series']);
  	let len = series.length;
  	if (this.chartType == 'pie' && len>1){
  		
  		let div = 100/len;
  		let size = div/2;
  		for(let i=0; i<len;i++){
  			//console.log("seriesArray: " + series[0]);
  			let obj = series[i];
  			//let firstObj = series[0];
  			let center = size + i*div;
  			//firstObj[] = 
  			obj["size"] = div+"%";
  			obj["center"] = [center+"%",div+"%"];
		}
		instance.contentInit(series);  		

  	}else{
  		instance.contentInit(input['series']);
    }
  }

  onChartFileSelect(input: HTMLInputElement) {   
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
        if(filetype[1] == 'json'){
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
     
  jsonInput(){    
    console.log("JSON : ===> "+JSON.stringify(this.jsonData));
    console.log("JSON.parse : ===> "+this.jsonData);  
    this.loadChart(); 
  }

  errorInput(){    
    this.jsonData = null;
    alert("Warning: input type is not json type");
  }

  contentInit(series) {
  	let input = this.jsonData;
  	console.log("===========input===========: "+input['title']);


    const options: Highcharts.Options = {
      chart: {
      	plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: this.chartType
      },
      exporting: {
        enabled: true        
      },
      title: {
        text: input['title'],
	    floating: false,
	    align: 'right',
	    x: -30,
	    y: 30
      },
      xAxis: {
        categories: input['xAxis']
      },
      yAxis: {
        title: {
          text: input['yAxis']
        }
       },       
       tooltip: {
        pointFormat: '{series.name}: {categories} <b>{point.percentage:.1f}%</b>'
       },
       plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{series.name}</b>: {point.percentage:.1f} %',
                style: {
                   /* color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'*/
                }
            }
        }
       },
      series: series
    };

    this.chart = chart(this.chartTarget.nativeElement, options);
  }

  ngOnDestroy() {
    this.chart = null;
  }
}

