import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {MainComponent} from "./main/main.component";
import {SymptomsComponent} from "./symptoms/symptoms.component";
import {NgxSpinnerService} from "ngx-spinner";
import {StatsComponent} from "./stats/stats.component";
import {ContactComponent} from "./contact/contact.component";
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {CovidService} from "./services/covid.service";
import {map} from "rxjs";
import Global from "./models/Global";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit{
  constructor(public viewContainerRef: ViewContainerRef,  private _auth: AuthService, public spinner: NgxSpinnerService, private covidService: CovidService, private cd: ChangeDetectorRef) {

  }

  activeMenu: string = 'main';
  isLogin: boolean = false
  user: string = ''

  @ViewChild('placeholder', {read: ViewContainerRef, static: true}) placeholder!: ViewContainerRef

  ngAfterViewInit(): void {
    this.cd.detectChanges();
    this.placeholder.clear();
    let mainComponent = this.placeholder.createComponent(MainComponent);
    this.covidService.GetGlobal().subscribe(x => {
      mainComponent.instance.global = x
    })
  }

  ngOnInit(): void {
    if(this._auth.getUserDetails()){
      this.isLogin = true;
      this.user = JSON.parse(this._auth.getUserDetails()!)['name']
    }
  }

  logout(){
    this._auth.clearStorage()
    this.isLogin = false
    this.user = ''
    location.reload()
  }

  async onMenuLinkClicked(id: string): Promise<void> {
    await this.spinner.show();
    this.placeholder.clear();

    switch (id) {
      case 'main':
        let mainComponent = this.placeholder.createComponent(MainComponent)
        this.activeMenu = 'main'
        this.covidService.GetGlobal().subscribe(x => {
          mainComponent.instance.global = x
        })
        break
      case 'symptoms':
        this.placeholder.createComponent(SymptomsComponent)
        this.activeMenu = 'symptoms'
        break
      case 'stats':
        let statsComponent = this.placeholder.createComponent(StatsComponent)
        this.activeMenu = 'stats'
        this.covidService.GetCountries().subscribe(x => {
          statsComponent.instance.countries = x
        })
        this.covidService.GetGlobal().subscribe(x => {
          statsComponent.instance.global = x
        })
        break
      case 'contact':
        this.placeholder.createComponent(ContactComponent)
        this.activeMenu = 'contact'
        break
      case 'login':
        this.placeholder.createComponent(LoginComponent)
        break
      case 'registration':
        this.placeholder.createComponent(RegistrationComponent)
        break
    }

    setTimeout(() => {
      this.spinner.hide();
    }, 700)
  }
}

