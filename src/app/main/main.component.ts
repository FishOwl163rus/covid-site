import {Component, Injector, OnInit} from '@angular/core';
import {Global} from "../models/Global";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private inject: Injector) { }
  public global: Global = new Global()

  ngOnInit(): void {
  }

  async onClick(){
    await this.inject.get<AppComponent>(AppComponent).onMenuLinkClicked('stats')
  }

}
