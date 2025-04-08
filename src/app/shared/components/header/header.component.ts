import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Option } from '../../interface/theme-option.interface';
import { ThemeOptionState } from '../../store/state/theme-option.state';
import { ThemeState } from '../../store/state/theme.state';
import { HeaderEightComponent } from './header-eight/header-eight.component';
import { HeaderFiveComponent } from './header-five/header-five.component';
import { HeaderFourComponent } from './header-four/header-four.component';
import { HeaderOneComponent } from './header-one/header-one.component';
import { HeaderSevenComponent } from './header-seven/header-seven.component';
import { HeaderSixComponent } from './header-six/header-six.component';
import { HeaderThreeComponent } from './header-three/header-three.component';
import { HeaderTwoComponent } from './header-two/header-two.component';
import { MobileMenuComponent } from './widgets/mobile-menu/mobile-menu.component';

@Component({
    selector: 'app-header',
    imports: [CommonModule, HeaderTwoComponent, MobileMenuComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {

  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;
  activeTheme$: Observable<string> = inject(Store).select(ThemeOptionState.themeOptions);

  @Input() logo?: string | undefined;

  public style: string = 'header_one';
  public sticky: boolean = true;
  public path: string;
  public overlayHeaders = ['fashion_seven', 'furniture_dark', 'jewellery_one', 'christmas', 'gym', 'digital_download'];
  public overlayTheme: string;
  public activeTheme: string;
  public routes: string;

  constructor(private router: Router, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.path = params['theme'];
      this.setHeader();
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setHeader();
      }
    });
  }

  setHeader() {
    if(this.path){
        this.style = 'header_one';
    }
    else if(!this.path){
      this.themeOption$.subscribe(theme => {
        this.style = theme?.header ? theme?.header.header_options : 'header_one';
        this.sticky = theme?.header && theme?.header?.sticky_header_enable ? true : this.sticky;
      });
    }
  }
}
