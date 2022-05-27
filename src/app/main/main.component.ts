import { Component, OnInit } from '@angular/core';
import {Global} from "../models/Global";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }
  public global: Global = new Global()

  ngOnInit(): void {
  }

}
