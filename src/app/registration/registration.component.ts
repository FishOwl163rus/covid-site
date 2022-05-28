import {Component, Injector, OnInit} from '@angular/core';
import {ApiService} from "../services/api.service";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  isLogin: boolean = false
  data: string = ''
  errorMessage: any

  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private injector: Injector
  ) {

  }
  ngOnInit() {
    this.isUserLogin();
  }

  onSubmit(form: NgForm) {
    this._api.postTypeRequest('user/register', form.value).subscribe((res: any) => {
      if (res.status) {
        this._auth.setDataInLocalStorage('userData', JSON.stringify(res.data));
        this._auth.setDataInLocalStorage('token', res.token);
        this.isLogin = true;
        this.data = this._auth.getUserDetails()!
        const parent: AppComponent = this.injector.get<AppComponent>(AppComponent);
        parent.isLogin = true;
        parent.user = JSON.parse(this.data)['name']
      } else {
        alert('Пользователь уже существует!')
      }
    });
  }
  isUserLogin(){

    if(this._auth.getUserDetails() != null){
      this.isLogin = true;
      this.data = this._auth.getUserDetails()!
      const parent: AppComponent = this.injector.get<AppComponent>(AppComponent);
      parent.isLogin = true;
      parent.user = JSON.parse(this.data)['name']
    }
  }

}


