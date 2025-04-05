import { inject, Pipe, PipeTransform } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { SettingState } from '../store/state/setting.state';
import { Observable } from 'rxjs';
import { Currency } from '../interface/currency.interface';
import { Values } from '../interface/setting.interface';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'currencySymbol',
  standalone: true
})
export class CurrencySymbolPipe implements PipeTransform {

  selectedCurrency$: Observable<Currency> = inject(Store).select(SettingState.selectedCurrency) as Observable<Currency>;

  public symbol: string = '$';
  public setting: Values;
  public selectedCurrency: Currency;

  constructor(private currencyPipe: CurrencyPipe) {
    this.selectedCurrency$.subscribe(currency => this.selectedCurrency = currency);
  }

  transform(value: number | undefined, position: 'before_price' | 'after_price' | string = 'before_price'): string | number {
    if(!value) {
      value = 0;
    };
    value = Number(value);
    value = (value * this.selectedCurrency?.exchange_rate);

    this.symbol = this.selectedCurrency?.symbol;
    position = this.selectedCurrency?.symbol_position;

    let formattedValue = this.currencyPipe.transform(value, this.symbol);
    formattedValue = formattedValue?.replace(this.symbol, '')!;

    if (position === 'before_price') {
      return `${this.symbol}${formattedValue}`;
    } else {
      return `${formattedValue}${this.symbol}`;
    }
  }
}
