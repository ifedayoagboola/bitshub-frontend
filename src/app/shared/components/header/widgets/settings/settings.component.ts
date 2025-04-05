import { Component, Inject, inject, PLATFORM_ID } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { SettingState } from '../../../../store/state/setting.state';
import { Observable } from 'rxjs';
import { Language, Values } from '../../../../interface/setting.interface';
import { Currency, CurrencyModel } from '../../../../interface/currency.interface';
import { CurrencyState } from '../../../../store/state/currency.state';
import { SelectedCurrency } from '../../../../store/action/setting.action';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { languages } from '../../../../interface/theme-option.interface';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-settings',
    imports: [CommonModule, TranslateModule],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss'
})
export class SettingsComponent {

  setting$: Observable<Values> = inject(Store).select(SettingState.setting) as Observable<Values>;
  selectedCurrency$: Observable<Currency> = inject(Store).select(SettingState.selectedCurrency) as Observable<Currency>;
  currency$: Observable<CurrencyModel> = inject(Store).select(CurrencyState.currency) as Observable<CurrencyModel>;

  public selectedCurrency: Currency;
  public setting: Values;
  public active: boolean = false;
  public languages: languages[] = [
    {
      language: 'English',
      code: 'en',
      icon: 'us'
    },
    {
      language: 'Français',
      code: 'fr',
      icon: 'fr'
    }, // Add More Language
  ]

  public selectedLanguage: languages = {
    language: 'English',
    code: 'en',
    icon: 'us'
  }
  public isBrowser: boolean;
  constructor(private translate: TranslateService, private store: Store,  @Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.selectedCurrency$.subscribe((setting) => {
      if(setting){
        this.selectedCurrency = setting
      }
    });

    let language = localStorage.getItem("language");

    if(language == null){
      localStorage.setItem("language", JSON.stringify(this.selectedLanguage));
      this.translate.use(this.selectedLanguage.code);
    }else{
      this.selectedLanguage = JSON.parse(language);
      this.translate.use(this.selectedLanguage.code);
    }
  }

  selectLanguage(language: Language){
    this.active = false;
    this.translate.use(language.code);
    this.selectedLanguage = language;
    localStorage.setItem("language", JSON.stringify(this.selectedLanguage));
  }

  selectCurrency(currency: Currency){
    this.selectedCurrency = currency;
    this.store.dispatch(new SelectedCurrency(currency)).subscribe({
      complete: () => {
        if(this.isBrowser) {
          window.location.reload();
        }
      }
    });
  }

}
