import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Country} from "../models/Country";
import {Global} from "../models/Global";
import Covid from "../models/Covid";

@Injectable({
  providedIn: 'root'
})
export class CovidService {
  constructor(private http: HttpClient) {}

  public GetCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(environment.country_url, {responseType: 'json'});
  }

  public GetGlobal(): Observable<Global> {
    return this.http.get<Global>(environment.global_url, {responseType: 'json'});
  }

  public GetCovid(country: string, date: string): Observable<Covid[]> {
    return this.http.get<Covid[]>(`${environment.covid_url}/${country}/${date}`, {responseType: 'json'});
  }
}
