import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ChartsComponent} from "../charts/charts.component";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor() { }
  @ViewChild('placeholder', {read: ViewContainerRef, static: true}) placeholder!: ViewContainerRef
  ngOnInit(): void {
    this.placeholder.createComponent(ChartsComponent)
  }

}
