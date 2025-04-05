import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ButtonComponent } from '../../../widgets/button/button.component';
import { languages } from '../../../../interface/theme-option.interface';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ClickOutsideDirective } from '../../../../directive/outside.directive';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-language',
    imports: [ButtonComponent, ClickOutsideDirective],
    templateUrl: './language.component.html',
    styleUrl: './language.component.scss'
})
export class LanguageComponent {

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

  constructor(private translate: TranslateService, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if(isPlatformBrowser(this.platformId)){
      let language = localStorage.getItem("language");
  
      if(language == null){
        localStorage.setItem("language", JSON.stringify(this.selectedLanguage));
        this.translate.use(this.selectedLanguage.code);
      }else{
        this.selectedLanguage = JSON.parse(language);
        this.translate.use(this.selectedLanguage.code);
      }
    }
  }

  openDropDown(){
    this.active = !this.active;
  }

  hideDropdown(){
    this.active = false;
  }

  selectLanguage(language: languages){
    this.active = false;
    this.translate.use(language.code);
    this.selectedLanguage = language;
    localStorage.setItem("language", JSON.stringify(this.selectedLanguage));
  }
}
