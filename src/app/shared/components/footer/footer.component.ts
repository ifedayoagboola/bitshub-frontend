import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FooterOneComponent } from './footer-one/footer-one.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { ThemeOptionState } from '../../store/state/theme-option.state';
import { Observable } from 'rxjs';
import { FooterTwoComponent } from './footer-two/footer-two.component';
import { FooterThreeComponent } from './footer-three/footer-three.component';
import { FooterFourComponent } from './footer-four/footer-four.component';
import { Option } from '../../../shared/interface/theme-option.interface';

@Component({
    selector: 'app-footer',
    imports: [CommonModule, FooterOneComponent, FooterTwoComponent,
        FooterThreeComponent, FooterFourComponent],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent {

  @Input() logo: string | undefined;

  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;

  public type: string;
  public path: string;
  public newsLetterStyle: string;
  public themeOptions: Option;
  constructor(private router: Router, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.path = params['theme'];
      this.setFooter();
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setFooter();
      }
    });
  }

  setFooter() {
    this.themeOption$.subscribe(option => {
      if(option) {
        var optionString = JSON.stringify(option);
        var StoreJson = JSON.parse(optionString)
        if(this.path){
          if(this.path == 'fashion_three' ||
            this.path == 'furniture_one' ||
            this.path == 'furniture_two' ||
            this.path == 'fashion_four' ||
            this.path == 'fashion_five' ||
            this.path == 'fashion_seven' ||
            this.path == 'furniture_dark' ||
            this.path == 'electronics_one' ||
            this.path == 'electronics_two' ||
            this.path == 'marketplace_one' ||
            this.path == 'marketplace_four' ||
            this.path == 'vegetables_one' ||
            this.path == 'vegetables_two' ||
            this.path == 'jewellery_two' ||
            this.path == 'vegetables_three' ||
            this.path == 'vegetables_four' ||
            this.path == 'jewellery_three' ||
            this.path == 'watch' ||
            this.path == 'medical' ||
            this.path == 'kids' ||
            this.path == 'books' ||
            this.path == 'beauty' ||
            this.path == 'left_sidebar' ||
            this.path == 'goggles' ||
            this.path == 'video_slider' ||
            this.path == 'flower' ||
            this.path == 'perfume' ||
            this.path == 'gradient' ||
            this.path == 'surfboard' ||
            this.path == 'video'){
            this.type = "footer_one";
          } else if (this.path == 'fashion_two' ||
            this.path == 'fashion_six' ||
            this.path == 'bag' ||
            this.path == 'marijuana' ||
            this.path == 'game' ||
            this.path == 'shoes' ||
            this.path == 'jewellery_one' ||
            this.path == 'single_product'
          ){ this.type = "footer_two";
          } else if (this.path == 'fashion_one' ||
            this.path == 'electronics_three' ||
            this.path == 'marketplace_three' ||
            this.path == 'bicycle' ||
            this.path == 'marketplace_two' ||
            this.path == 'pets' ||
            this.path == 'nursery' || this.path == 'full_page') {
            this.type = "footer_three";
          } else if (this.path == 'digital_download') {
            StoreJson.footer['bg_image'] = '/images/footer/footer.png'
            this.type = 'footer_four';
          }else if (this.path == 'christmas') {
            StoreJson.footer['bg_image'] = '/images/footer/footer.png'
            this.type = 'footer_four';
          }else if(this.path == 'tools'){
            StoreJson.footer['bg_image'] = '/images/footer/footer.png'
            this.type = 'footer_four';
          }else if(this.path == 'gym'){
            StoreJson.footer['bg_image'] = '/images/footer/footer.png'
            this.type = 'footer_four';
          }
          this.themeOptions = StoreJson;
        } else {
          this.themeOptions = option;
          this.type = option?.footer ? option?.footer.footer_style : 'footer_one ';
        }
      }
    })
  }
}
