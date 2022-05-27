import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Country} from "../models/Country";
import {Global} from "../models/Global";

@Injectable({
  providedIn: 'root'
})
export class CovidService {
  constructor(private http: HttpClient) {}

  public GetGenres(): Observable<Country[]> {
    return this.http.get<Country[]>(environment.country_url, {responseType: 'json'});
  }

  public GetGlobal(): Observable<Global> {
    return this.http.get<Global>(environment.global_url, {responseType: 'json'});
  }
}
