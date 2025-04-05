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
    imports: [CommonModule, HeaderOneComponent, HeaderTwoComponent, HeaderThreeComponent, HeaderFourComponent,
        HeaderFiveComponent, HeaderSixComponent, HeaderSevenComponent, HeaderEightComponent, MobileMenuComponent],
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
      if(
        this.path == 'fashion_one' ||
        this.path == 'fashion_two' ||
        this.path == 'fashion_three' ||
        this.path == 'fashion_four' ||
        this.path == 'electronics_two' ||
        this.path == 'jewellery_three' ||
        this.path == 'bag' ||
        this.path == 'watch' ||
        this.path == 'kids' ||
        this.path == 'beauty' ||
        this.path == 'goggles' ||
        this.path == 'video_slider' ||
        this.path == 'gradient' ||
        this.path == 'left_sidebar' ||
        this.path == 'parallax' || this.path == 'vegetables_three' ||
        this.path == 'fashion_seven'
      ) {
        this.style = "header_one";
      }
      else if(this.path == 'fashion_five'){
        this.style = 'header_three';
      }
      else if(this.path == 'fashion_six' || this.path == 'jewellery_two' || this.path == 'medical' || this.path == 'perfume' || this.path == 'nursery'){
        this.style = 'header_one';
      }
      else if(this.path == 'furniture_dark' || this.path == 'jewellery_one' || this.path == 'christmas' || this.path == 'digital_download' || this.path == 'single_product'){
        this.style = 'header_four';
      }
      else if(this.path == 'furniture_one' || this.path == 'shoes'){
        this.style = 'header_five'
      }
      else if(this.path == 'furniture_two'){
        this.style = 'header_six';
      }
      else if(this.path == 'electronics_one'){
        this.style = "header_one";
      }
      else if(this.path == 'electronics_three' || this.path == 'books' || this.path == 'pets' ){
        this.style = 'header_six'
      }
      else if(this.path == 'marketplace_one'){
        this.style = 'header_one';
      }
      else if(this.path == 'marketplace_two'){
        this.style = 'header_six';
      }
      else if(this.path == 'marketplace_three'){
        this.style = 'header_six';
      }
      else if(this.path == 'marketplace_four'){
        this.style = 'header_six';
      }
      else if(this.path == 'vegetables_one'){
        this.style = 'header_five';
      }
      else if(this.path == 'vegetables_two'){
        this.style = 'header_six'
      }
      else if(this.path == 'vegetables_four'){
        this.style = 'header_two';
      }
      else if(this.path == 'marijuana'){
        this.style = 'header_five'
      }
      else if(this.path == 'bicycle'){
        this.style = 'header_seven';
      }
      else if(this.path == 'tools'){
        this.style = 'header_one';
      }
      else if(this.path == 'video' || this.path == 'full_page'){
        this.style = 'header_eight';
      }
    }
    else if(!this.path){
      this.themeOption$.subscribe(theme => {
        this.style = theme?.header ? theme?.header.header_options : 'header_one';
        this.sticky = theme?.header && theme?.header?.sticky_header_enable ? true : this.sticky;
      });
    }
  }
}
