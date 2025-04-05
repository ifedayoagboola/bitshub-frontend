import { Component, Inject, inject, Input, PLATFORM_ID } from '@angular/core';
import { Select, Store } from '@ngxs/store';
 import { Observable } from 'rxjs';
import { Values } from '../../../../interface/setting.interface';
import { Currency, CurrencyModel } from '../../../../interface/currency.interface';
import { SelectedCurrency } from '../../../../store/action/setting.action';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ButtonComponent } from '../../../widgets/button/button.component';
import { ClickOutsideDirective } from '../../../../directive/outside.directive';
import { SettingState } from '../../../../store/state/setting.state';
import { CurrencyState } from '../../../../store/state/currency.state';

@Component({
    selector: 'app-currency',
    imports: [CommonModule, ButtonComponent, ClickOutsideDirective],
    templateUrl: './currency.component.html',
    styleUrl: './currency.component.scss'
})
export class CurrencyComponent {

  setting$: Observable<Values> = inject(Store).select(SettingState.setting) as Observable<Values>;
  selectedCurrency$: Observable<Currency> = inject(Store).select(SettingState.selectedCurrency) as Observable<Currency>;
  currency$: Observable<CurrencyModel> = inject(Store).select(CurrencyState.currency) as Observable<CurrencyModel>;

  public open: boolean = false;
  public selectedCurrency: Currency;
  public setting: Values;
  public isBrowser: boolean;

  constructor( private store: Store, @Inject(PLATFORM_ID) platformId: object){
    this.isBrowser = isPlatformBrowser(platformId);
    this.selectedCurrency$.subscribe(setting => {
      this.selectedCurrency = setting!;
    });
  }

  openDropDown(){
    this.open = !this.open;
  }

  selectCurrency(currency: Currency){
    this.selectedCurrency = currency;
    this.open = false;
    this.store.dispatch(new SelectedCurrency(currency)).subscribe({
      complete: () => {
        if(this.isBrowser) {
          window.location.reload();
        }
      }
    });
  }

  hideDropdown(){
    this.open = false;
  }

}
