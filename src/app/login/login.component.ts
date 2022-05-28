import {Component, Injector, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import { ApiService } from '../services/api.service'
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router';
import {AppComponent} from "../app.component";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogin: boolean = false
  data: string = ''
  errorMessage: any
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private injector: Injector
  ) { }
  ngOnInit() {
    this.isUserLogin();
  }

  password: string = "";
  email: string = "";

  onSubmit(form: NgForm) {
    this._api.postTypeRequest('user/login', form.value).subscribe((res: any) => {
      if (res.status) {
        this._auth.setDataInLocalStorage('userData', JSON.stringify(res.data));
        this._auth.setDataInLocalStorage('token', res.token);
        this.isLogin = true
        this.data = this._auth.getUserDetails()!
        const parent: AppComponent = this.injector.get<AppComponent>(AppComponent);
        parent.isLogin = true;
        parent.user = JSON.parse(this.data)['name']
      } else {
        alert('Неверные данные для входа')
      }
    })
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
  logout(){
    this._auth.clearStorage()
    this.isLogin = false
    const parent: AppComponent = this.injector.get<AppComponent>(AppComponent);
    parent.isLogin = false;
    parent.user = ''
  }
}
