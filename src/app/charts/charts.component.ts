import {AfterViewInit, Component, OnInit} from '@angular/core';
// @ts-ignore
import * as CanvasJS from 'src/assets/canvasjs.min.js';
import Covid from "../models/Covid";
import {ChartData} from "../models/ChartData";

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  constructor() { }

  public covid: Covid[] = new Array<Covid>()
  public title: string = 'BY'
  mapCovidDataAndPushToChartActive() {
    return this.covid.map((x): any => {
      return {x: new Date(x.date), y: x.active}
    })
  }
  mapCovidDataAndPushToChartDeaths() {
    return this.covid.map((x): any => {
      return {x: new Date(x.date), y: x.deaths}
    })
  }
  mapCovidDataAndPushToChartConfirmed() {
    return this.covid.map((x): any => {
      return {x: new Date(x.date), y: x.confirmed}
    })
  }
  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    let activeData = this.mapCovidDataAndPushToChartActive()
    let confirmedData = this.mapCovidDataAndPushToChartConfirmed()
    let deathData = this.mapCovidDataAndPushToChartDeaths()

    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      theme: "light2",
      title:{
        text: this.title
      },
      axisX:{
        valueFormatString: "DD MMM",
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        title: "Данные",
        includeZero: true,
        crosshair: {
          enabled: true
        }
      },
      toolTip:{
        shared:true
      },
      legend:{
        cursor:"pointer",
        verticalAlign: "bottom",
        horizontalAlign: "left",
        dockInsidePlotArea: true
      },
      data: [{
        type: "line",
        showInLegend: true,
        name: "Кол-во заражений",
        markerType: "square",
        xValueFormatString: "DD MMM, YYYY",
        color: "#F08080",
        dataPoints: activeData
      },
        {
          type: "line",
          showInLegend: true,
          name: "Кол-во смертей",
          markerType: "square",
          xValueFormatString: "DD MMM, YYYY",
          color: "#8f1ea6",
          dataPoints: deathData
        },
        {
          type: "line",
          showInLegend: true,
          name: "Кол-во подтвержденных заражений",
          markerType: "square",
          xValueFormatString: "DD MMM, YYYY",
          color: "#1cf30d",
          dataPoints: confirmedData
        }]
    });

    chart.render();
  }

}
