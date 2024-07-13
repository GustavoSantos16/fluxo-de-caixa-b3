import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {

  private apiUrl = 'https://economia.awesomeapi.com.br/json/last/';
  constructor(private http: HttpClient) { }


  getCurrencies(moedas: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${moedas}`);
  }
}
