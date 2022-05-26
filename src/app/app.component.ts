import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {MainComponent} from "./main/main.component";
import {SymptomsComponent} from "./symptoms/symptoms.component";
import {NgxSpinnerService} from "ngx-spinner";
import {StatsComponent} from "./stats/stats.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit{
  constructor(public viewContainerRef: ViewContainerRef,  public spinner: NgxSpinnerService, private cd: ChangeDetectorRef) {

  }

  activeMenu: string = 'main';
  @ViewChild('placeholder', {read: ViewContainerRef, static: true}) placeholder!: ViewContainerRef

  ngAfterViewInit(): void {
    this.cd.detectChanges();
    this.placeholder.clear();
    this.placeholder.createComponent(MainComponent);
  }

  ngOnInit(): void {
  }

  async onMenuLinkClicked(id: string): Promise<void> {
    await this.spinner.show();
    this.placeholder.clear();

    switch (id) {
      case 'main':
        this.placeholder.createComponent(MainComponent)
        this.activeMenu = 'main'
        break
      case 'symptoms':
        this.placeholder.createComponent(SymptomsComponent)
        this.activeMenu = 'symptoms'
        break
      case 'stats':
        this.placeholder.createComponent(StatsComponent)
        this.activeMenu = 'stats'
        break
    }

    setTimeout(() => {
      this.spinner.hide();
    }, 1000)
  }
}

