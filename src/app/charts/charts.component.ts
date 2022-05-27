import {AfterViewInit, Component, OnInit} from '@angular/core';
// @ts-ignore
import * as CanvasJS from 'src/assets/canvasjs.min.js';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      theme: "light2",
      title:{
        text: "Simple Line Chart"
      },
      data: [{
        type: "line",
        indexLabelFontSize: 16,
        dataPoints: [
          { y: 450 },
          { y: 414},
          { y: 520, indexLabel: "\u2191 highest",markerColor: "red", markerType: "triangle" },
          { y: 460 },
          { y: 450 },
          { y: 500 },
          { y: 480 },
          { y: 480 },
          { y: 410 , indexLabel: "\u2193 lowest",markerColor: "DarkSlateGrey", markerType: "cross" },
          { y: 500 },
          { y: 480 },
          { y: 510 }
        ]
      }]
    });

    chart.render();
  }

  ngAfterViewInit(): void {
  }

}
