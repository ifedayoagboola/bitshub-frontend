import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ThemeOptionService } from '../../../services/theme-option.service';
import { Select, Store } from '@ngxs/store';
import { ThemeOptionState } from '../../../store/state/theme-option.state';
import { Observable } from 'rxjs';
import { Option } from '../../../interface/theme-option.interface';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DemoProductBoxComponent } from './demo-product-box/demo-product-box.component';
import { ThemeState } from '../../../store/state/theme.state';
import { ThemesModel } from '../../../interface/theme.interface';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'app-theme-customizer',
    imports: [CommonModule, RouterModule, FormsModule, TranslateModule,
        DemoProductBoxComponent, NgbAccordionModule],
    templateUrl: './theme-customizer.component.html',
    styleUrl: './theme-customizer.component.scss'
})

export class ThemeCustomizerComponent {

  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions);
  theme$: Observable<ThemesModel> = inject(Store).select(ThemeState.themes) as Observable<ThemesModel>;

  public open = false;

  public mode: boolean;
  public languageDirection: boolean;
  public layoutValue: boolean;
  public themeOption: Option;
  public StorageURL = environment.storageURL;
  public isBrowser: boolean;

  constructor(public themeOptionService: ThemeOptionService,
    @Inject(PLATFORM_ID) private platformId: Object){
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.themeOption$.subscribe(option => {
      this.themeOption = option;
      this.languageDirection = option?.general && option?.general?.language_direction === 'rtl' ? true : false
      this.mode = option?.general && option?.general?.mode === 'dark' ? true : false
    })
  }

  openSetting(value: boolean){
    this.open = value;
  }

  layoutMode(){
    if(this.isBrowser) {
      if(!this.mode){
        document.body.classList.add('dark');
      }else{
        document.body.classList.remove('dark');
      }
    }
  }

  layoutType(){
    if(this.isBrowser) {
      if(!this.languageDirection){
        document.body.classList.add('rtl');
      }else{
        document.body.classList.remove('rtl');
      }
    }
  }

  changedColor(event: any, value: string){
    // document.body.style.setProperty(value, event.target.value);
  }

}
