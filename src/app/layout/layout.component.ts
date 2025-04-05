import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, inject, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router, RouterModule } from '@angular/router';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { Store } from '@ngxs/store';
import { forkJoin, Observable } from 'rxjs';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { BackToTopComponent } from '../shared/components/widgets/back-to-top/back-to-top.component';
import { LoaderComponent } from '../shared/components/widgets/loader/loader.component';
import { ExitModalComponent } from '../shared/components/widgets/modal/exit-modal/exit-modal.component';
import { LoginModalComponent } from '../shared/components/widgets/modal/login-modal/login-modal.component';
import { NewsletterModalComponent } from '../shared/components/widgets/modal/newsletter-modal/newsletter-modal.component';
import { RecentPurchasePopupComponent } from '../shared/components/widgets/recent-purchase-popup/recent-purchase-popup.component';
import { StickyCompareComponent } from '../shared/components/widgets/sticky-compare/sticky-compare.component';
import { ThemeCustomizerComponent } from '../shared/components/widgets/theme-customizer/theme-customizer.component';
import { Option } from '../shared/interface/theme-option.interface';
import { AuthService } from '../shared/services/auth.service';
import { ThemeOptionService } from '../shared/services/theme-option.service';
import { GetMenu } from '../shared/store/action/menu.action';
import { GetProductBySearchList } from '../shared/store/action/product.action';
import { ThemeOptions } from '../shared/store/action/theme-option.action';
import { ThemeOptionState } from '../shared/store/state/theme-option.state';

@Component({
    selector: 'app-layout',
    imports: [CommonModule, LoaderComponent, FooterComponent, ThemeCustomizerComponent, RouterModule, LoadingBarRouterModule,
        HeaderComponent, BackToTopComponent, StickyCompareComponent, NewsletterModalComponent,
        RecentPurchasePopupComponent, ExitModalComponent, LoginModalComponent],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;
  cookies$: Observable<boolean> = inject(Store).select(ThemeOptionState.cookies)
  exit$: Observable<boolean> = inject(Store).select(ThemeOptionState.exit)

  @ViewChild("newsletterModal") NewsletterModal: NewsletterModalComponent;
  @ViewChild("exitModal") ExitModal: ExitModalComponent;
  @ViewChild("loginModal") LoginModal: LoginModalComponent;

  public cookies: boolean;
  public exit: boolean;
  public theme: string;
  public show: boolean;
  public isBrowser: boolean;

  constructor(private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    public themeOptionService: ThemeOptionService,
    public authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object,) {
      this.isBrowser = isPlatformBrowser(this.platformId);

    this.store.dispatch(new ThemeOptions())
    this.cookies$.subscribe(res => this.cookies = res);
    this.exit$.subscribe(res => this.exit = res);

    this.router.events.subscribe(
      (event) => {
        if ( event instanceof NavigationEnd ) {
          this.router.url
      }
      }
    );

    this.route.queryParams.subscribe(params => this.theme = params['theme']);
    this.router.events.subscribe(
      (event: Params) => {
        if (this.isBrowser) {
          if(event instanceof NavigationEnd ) {
            if(this.theme){
              document.body.classList.add('home');
              if(this.theme == 'fashion_one' ||
                 this.theme == 'vegetables_one' ||
                 this.theme == 'tools' ||
                 this.theme == 'game' ||
                 this.theme == 'left_sidebar' ||
                 this.theme == 'video' ||
                 this.theme == 'full_page'){
                themeOptionService.theme_color = '#ec8951'
              }
              else if(this.theme == 'bicycle' || this.theme == 'christmas'){
                themeOptionService.theme_color = '#ff4c3b'
              }
              else if(this.theme == 'fashion_two'){
                themeOptionService.theme_color = '#fe816d'
              }
              else if(this.theme == 'fashion_three'){
                themeOptionService.theme_color = '#96796d'
              }
              else if(this.theme == 'fashion_four'){
                themeOptionService.theme_color = '#000000'
              }
              else if(this.theme == 'fashion_five'){
                themeOptionService.theme_color = '#C0AA73'
              }
              else if(this.theme == 'fashion_six'){
                themeOptionService.theme_color = '#90453e'
              }
              else if(this.theme == 'fashion_seven'){
                themeOptionService.theme_color = '#3fd09e'
              }
              else if(this.theme == 'furniture_one' || this.theme == 'furniture_two' || this.theme == 'furniture_dark' || this.theme == 'jewellery_two' || this.theme == 'jewellery_three'){
                themeOptionService.theme_color = '#d4b196'
              }
              else if(this.theme == 'electronics_one'){
                themeOptionService.theme_color = '#1a7ef2'
              }
              else if(this.theme == 'electronics_two'){
                themeOptionService.theme_color = '#6d7e87'
              }
              else if(this.theme == 'electronics_three'){
                themeOptionService.theme_color = '#2874f0'
              }
              else if(this.theme == 'marketplace_one'){
                themeOptionService.theme_color = '#3e5067'
              }
              else if(this.theme == 'marketplace_two' || this.theme == 'marketplace_four'){
                themeOptionService.theme_color = '#f39910';
                themeOptionService.theme_color_2 = '#394868'
              }
              else if(this.theme == 'marketplace_three'){
                themeOptionService.theme_color = '#387ef0';
              }
              else if(this.theme == 'vegetables_two' || this.theme == 'vegetables_three' || this.theme == 'nursery'){
                themeOptionService.theme_color = '#81ba00'
              }
              else if(this.theme == 'jewellery_one'){
                themeOptionService.theme_color = '#5fcbc4'
              }
              else if(this.theme == 'vegetables_four'){
                themeOptionService.theme_color = '#206664';
                themeOptionService.theme_color_2 = '#ee7a63'
              }
              else if(this.theme == 'bag' || this.theme == 'beauty'){
                themeOptionService.theme_color = '#f0b54d'
              }
              else if(this.theme == 'watch'){
                themeOptionService.theme_color = '#e4604a'
              }
              else if(this.theme == 'medical'){
                themeOptionService.theme_color = '#38c6bb'
              }
              else if(this.theme == 'perfume'){
                themeOptionService.theme_color = '#6d6659'
              }
              else if(this.theme == 'yoga'){
                themeOptionService.theme_color = '#f0583d'
              }
              else if(this.theme == 'marijuana'){
                themeOptionService.theme_color = '#5d7227';
                themeOptionService.theme_color_2 = '#203f15';
              }
              else if(this.theme == 'shoes'){
                themeOptionService.theme_color = '#d57151';
              }
              else if(this.theme == 'kids'){
                themeOptionService.theme_color = '#fa869b';
              }
              else if(this.theme == 'books'){
                themeOptionService.theme_color = '#5ecee4';
              }
              else if(this.theme == 'goggles'){
                themeOptionService.theme_color = '#dc457e';
              }
              else if(this.theme == 'video_slider'){
                themeOptionService.theme_color = '#e38888';
              }
              else if(this.theme == 'gym'){
                themeOptionService.theme_color = '#01effc';
                themeOptionService.theme_color_2 = '#485ff2';
              }
              else if(this.theme == 'flower'){
                themeOptionService.theme_color = '#fa869b';
              }
              else if(this.theme == 'digital_download'){
                themeOptionService.theme_color = '#234ca1';
              }
              else if(this.theme == 'pets'){
                themeOptionService.theme_color = '#ff9944';
              }
              else if(this.theme == 'parallax'){
                themeOptionService.theme_color = '#866e6c';
              }
              else if(this.theme == 'single_product'){
                themeOptionService.theme_color = '#854D9C';
                themeOptionService.theme_color_2 = '#d04ed6';
              }

              else if(this.theme == 'gradient'){
                themeOptionService.theme_color = '#dd5e89';
                themeOptionService.theme_color_2 = '#f7bb97';
              }
              else if(this.theme == 'surfboard'){
                themeOptionService.theme_color = '#2E94D2'
              }
            }else {
            // document.body.classList.remove('home');

              this.themeOption$.subscribe((value) => {
                if(value){
                  themeOptionService.theme_color = value?.general?.primary_color;
                  themeOptionService.theme_color_2 = value?.general?.secondary_color;

                  document.body.style.setProperty('--theme-color', themeOptionService.theme_color);
                }
              })
            }

            document.body.style.setProperty('--theme-color', themeOptionService.theme_color);

            if(themeOptionService.theme_color_2 && (this.theme == 'marketplace_two' || this.theme == 'marketplace_four' || this.theme == 'marijuana' || this.theme == 'vegetables_four' || this.theme == 'gym' || this.theme == 'gradient' || this.theme == 'single_product')){
              document.body.style.setProperty('--theme-color2', themeOptionService.theme_color_2);
            }else{
              document.body.style.removeProperty('--theme-color2');
              themeOptionService.theme_color_2 = ''
            }
        }

        }
      }
    );

    this.themeOptionService.preloader = true;
    const getProductBySearch$ =this.store.dispatch(new GetProductBySearchList());
    // const getCategories$ = this.store.dispatch(new GetCategories({ status: 1 }));
    const getMenu$ = this.store.dispatch(new GetMenu());

    // getCategories$,
    forkJoin([getMenu$, getProductBySearch$]).subscribe({
      complete: () => {
        this.themeOptionService.preloader = false;
      }
    });
  }

  openLoginModal(event: any){
    if(event){
      this.LoginModal.openModal();
    }
  }

  setLogo(){
    var headerLogo;
    var footerLogo;
    if(this.theme){
      if(this.theme == 'fashion_one' || this.theme == 'tools' || this.theme == 'left_sidebar' || this.theme == 'video'){
        headerLogo = "assets/images/icon/logo/12.png";
        footerLogo = "assets/images/icon/logo/f6.png";
      }
      else if(this.theme == 'fashion_two'){
        headerLogo = "assets/images/icon/logo/12.png";
        footerLogo = "assets/images/icon/logo/f3.png";
      }
      else if(this.theme == 'yoga'){
        headerLogo = "assets/images/icon/logo/41.png";
        footerLogo = "assets/images/icon/logo/41.png";
      }
      else if(this.theme == 'watch'){
        headerLogo = "assets/images/icon/logo/40.png";
        footerLogo = "assets/images/icon/logo/40.png";
      }
      else if(this.theme == 'vegetables_one'){
        headerLogo = "assets/images/icon/logo/12.png";
        footerLogo = "assets/images/icon/logo/12.png";
      }
      else if(this.theme == 'fashion_three'){
        headerLogo = "assets/images/icon/logo/39.png";
        footerLogo = "assets/images/icon/logo/39.png";
      }
      else if(this.theme == 'fashion_four'){
        headerLogo = "assets/images/icon/logo/10.png";
        footerLogo = "assets/images/icon/logo/10.png";
      }
      else if(this.theme == 'fashion_five'){
        headerLogo = "assets/images/icon/logo/46.png";
        footerLogo = "assets/images/icon/logo/46.png";
      }
      else if(this.theme == 'jewellery_one'){
        headerLogo = "assets/images/icon/logo/f14.png";
        footerLogo = "assets/images/icon/logo/f14.png";
      }
      else if(this.theme == 'fashion_six'){
        headerLogo = "assets/images/icon/logo/30.png";
        footerLogo = "assets/images/icon/logo/f9.png";
      }
      else if(this.theme == 'fashion_seven'){
        headerLogo = "assets/images/icon/logo/f12.png";
        footerLogo = "assets/images/icon/logo/f12.png";
      }
      else if(this.theme == 'furniture_one' || this.theme == 'furniture_two' || this.theme == 'jewellery_two' || this.theme == 'jewellery_three'){
        headerLogo = "assets/images/icon/logo/1.png";
        footerLogo = "assets/images/icon/logo/1.png";
      }
      else if(this.theme == 'furniture_dark'){
        headerLogo = "assets/images/icon/logo/f8.png";
        footerLogo = "assets/images/icon/logo/f8.png"
      }
      else if(this.theme == 'electronics_one'){
        headerLogo = "assets/images/icon/logo/3.png";
        footerLogo = "assets/images/icon/logo/3.png"
      }
      else if(this.theme == 'electronics_two'){
        headerLogo = "assets/images/icon/logo/5.png";
        footerLogo = "assets/images/icon/logo/5.png"
      }
      else if(this.theme == 'electronics_three' || this.theme == 'marketplace_three'){
        headerLogo = "assets/images/icon/logo/29.png";
        footerLogo = "assets/images/icon/logo/f10.png"
      }
      else if(this.theme == 'marketplace_one'){
        headerLogo = "assets/images/icon/logo/18.png";
        footerLogo = "assets/images/icon/logo/18.png"
      }
      else if(this.theme == 'marketplace_two'){
        headerLogo = "assets/images/icon/logo/f11.png";
        footerLogo = "assets/images/icon/logo/f11.png"
      }
      else if(this.theme == 'marketplace_four'){
        headerLogo = "assets/images/icon/logo/f11.png";
        footerLogo = "assets/images/icon/logo/32.png"
      }
      else if(this.theme == 'vegetables_two' || this.theme == 'vegetables_three'){
        headerLogo = "assets/images/icon/logo/7.png";
        footerLogo = "assets/images/icon/logo/7.png";
      }
      else if(this.theme == 'vegetables_four'){
        headerLogo = "assets/images/icon/logo/37.png";
        footerLogo = "assets/images/icon/logo/37.png";
      }
      else if(this.theme == 'bag'){
        headerLogo = "assets/images/icon/logo/logo.png";
        footerLogo = "assets/images/icon/logo/footerlogo.png"
      }
      else if(this.theme == 'medical'){
        headerLogo = "assets/images/icon/logo/22.png";
        footerLogo = "assets/images/icon/logo/22.png"
      }
      else if(this.theme == 'perfume'){
        headerLogo = "assets/images/icon/logo/34.png";
        footerLogo = "assets/images/icon/logo/34.png"
      }
      else if(this.theme == 'marijuana'){
        headerLogo = "assets/images/icon/logo/15.png";
        footerLogo = "assets/images/icon/logo/f2.png"
      }
      else if(this.theme == 'christmas'){
        headerLogo = "assets/images/icon/logo/f5.png";
        footerLogo = "assets/images/icon/logo/f5.png"
      }
      else if(this.theme == 'bicycle'){
        headerLogo = "assets/images/icon/logo/42.png";
        footerLogo = "assets/images/icon/logo/f5.png"
      }
      else if(this.theme == 'shoes'){
        headerLogo = "assets/images/icon/logo/48.png";
        footerLogo = "assets/images/icon/logo/f21.png"
      }
      else if(this.theme == 'flower'){
        headerLogo = "assets/images/icon/logo/6.png";
        footerLogo = "assets/images/icon/logo/6.png"
      }
      else if(this.theme == 'kids'){
        headerLogo = "assets/images/icon/logo/6.png";
        footerLogo = "assets/images/icon/logo/6.png"
      }
      else if(this.theme == 'books'){
        headerLogo = "assets/images/icon/logo/35.png";
        footerLogo = "assets/images/icon/logo/35.png"
      }
      else if(this.theme == 'beauty'){
        headerLogo = "assets/images/icon/logo/logo.png";
        footerLogo = "assets/images/icon/logo/logo.png"
      }
      else if(this.theme == 'surfboard'){
        headerLogo = "assets/images/icon/logo/47.png";
        footerLogo = "assets/images/icon/logo/47.png"
      }
      else if(this.theme == 'goggles'){
        headerLogo = "assets/images/icon/logo/4.png";
        footerLogo = "assets/images/icon/logo/4.png"
      }
      else if(this.theme == 'gym'){
        headerLogo = "assets/images/icon/logo/43.png";
        footerLogo = "assets/images/icon/logo/f15.png"
      }
      else if(this.theme == 'game'){
        headerLogo = "assets/images/icon/logo/44.png";
        footerLogo = "assets/images/icon/logo/f17.png"
      }
      else if(this.theme == 'video_slider'){
        headerLogo = "assets/images/icon/logo/17.png";
        footerLogo = "assets/images/icon/logo/17.png"
      }
      else if(this.theme == 'pets'){
        headerLogo = "assets/images/icon/logo/14.png";
        footerLogo = "assets/images/icon/logo/f18.png"
      }
      else if(this.theme == 'nursery'){
        headerLogo = "assets/images/icon/logo/7.png";
        footerLogo = "assets/images/icon/logo/f2.png"
      }
      else if(this.theme == 'gradient'){
        headerLogo = "assets/images/icon/logo/36.png";
        footerLogo = "assets/images/icon/logo/36.png"
      }
      else if(this.theme == 'full_page' || this.theme == 'parallax'){
        headerLogo = "assets/images/icon/logo/2.png";
        footerLogo = "assets/images/icon/logo/2.png"
      }
      else if(this.theme == 'digital_download'){
        headerLogo = "assets/images/icon/logo/45.png";
        footerLogo = "assets/images/icon/logo/45.png";
      }
      else if(this.theme == 'single_product'){
        headerLogo = "assets/images/icon/logo/f20.png";
        footerLogo = "assets/images/icon/logo/f20.png";
      }
    }else {
      this.themeOption$.subscribe(theme => {
      headerLogo = theme?.logo?.header_logo?.original_url;
      footerLogo = theme?.logo?.footer_logo?.original_url;
    });
    }
    return { header_logo: headerLogo, footer_logo: footerLogo}
  }


  // @HostListener Decorator
  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (this.isBrowser) {
      let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (number > 600) {
        this.show = true;
      } else {
        this.show = false;
      }
    }
  }
}
