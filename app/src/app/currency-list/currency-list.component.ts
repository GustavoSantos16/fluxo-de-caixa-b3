import { Component, OnInit } from '@angular/core';
import { CurrenciesService } from '../services/currencies.service';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss']
})
export class CurrencyListComponent implements OnInit {
  currencies: any;

  constructor(private currenciesService: CurrenciesService) { }

  ngOnInit(): void {
    this.currenciesService.getCurrencies('USD-BRL,EUR-BRL,BTC-BRL').subscribe(
      data => {
        this.currencies = data;        
      },
      error => {
        console.error('Erro ao buscar cotações', error);
      }
    );
  }

}
