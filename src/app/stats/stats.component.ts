import {Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import moment from "moment-timezone";
import {ChartsComponent} from "../charts/charts.component";
import { Country } from '../models/Country';
import Covid from '../models/Covid';
import Global from '../models/Global';
import { CovidService } from '../services/covid.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor(private covidService: CovidService) { }
  public countries: Country[] = new Array<Country>()
  public covid: Covid[] = new Array<Covid>()
  public global: Global = new Global()

  @ViewChild('placeholder', {read: ViewContainerRef, static: true}) placeholder!: ViewContainerRef
  @ViewChild('countrySelect', {read: ElementRef, static: true}) countrySelect!: ElementRef
  @ViewChild('dateSelect', {read: ElementRef, static: true}) dateSelect!: ElementRef

  ngOnInit(): void {
    let chartComponent = this.placeholder.createComponent(ChartsComponent)
    let nextDate = moment(new Date().toDateString()).tz("Europe/Minsk").toDate();
    nextDate = this.addHoursToDate(nextDate, -24 * 365)
    this.covidService.GetCovid('BY', moment(nextDate).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")).subscribe(x => {
      chartComponent.instance.covid = x
      chartComponent.instance.ngAfterViewInit()
    })
  }


  addHoursToDate(objDate: Date, intHours: number) {
    let numberOfMlSeconds = objDate.getTime();
    let addMlSeconds = (intHours * 60) * 60 * 1000;
    return new Date(numberOfMlSeconds + addMlSeconds);
}

  async submitSearchCovidData() {
    this.placeholder.clear();

    let chartComponent = this.placeholder.createComponent(ChartsComponent)
    let nextDate = moment(new Date(this.dateSelect.nativeElement.value).toDateString()).tz("Europe/Minsk").toDate();
    this.covidService.GetCovid(this.countrySelect.nativeElement.value, moment(nextDate).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")).subscribe(x => {
      chartComponent.instance.covid = x
      chartComponent.instance.title = this.countrySelect.nativeElement.value
      chartComponent.instance.ngAfterViewInit()
    })
  }

}
