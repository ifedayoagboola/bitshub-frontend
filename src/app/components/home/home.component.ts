import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { ThemeOptionService } from '../../shared/services/theme-option.service';

import { GetHomePage } from '../../shared/store/action/theme.action';

import { ThemeState } from '../../shared/store/state/theme.state';
import { BagComponent } from './bag/bag.component';
import { BeautyComponent } from './beauty/beauty.component';
import { BicycleComponent } from './bicycle/bicycle.component';
import { BooksComponent } from './books/books.component';
import { ChristmasComponent } from './christmas/christmas.component';
import { Electronic1Component } from './electronic/electronic-1/electronic-1.component';
import { Electronic2Component } from './electronic/electronic-2/electronic-2.component';
import { Electronic3Component } from './electronic/electronic-3/electronic-3.component';
import { Fashion1Component } from './fashion/fashion-1/fashion-1.component';
import { Fashion2Component } from './fashion/fashion-2/fashion-2.component';
import { Fashion3Component } from './fashion/fashion-3/fashion-3.component';
import { Fashion4Component } from './fashion/fashion-4/fashion-4.component';
import { Fashion5Component } from './fashion/fashion-5/fashion-5.component';
import { Fashion6Component } from './fashion/fashion-6/fashion-6.component';
import { Fashion7Component } from './fashion/fashion-7/fashion-7.component';
import { FlowerComponent } from './flower/flower.component';
import { Furniture1Component } from './furniture/furniture-1/furniture-1.component';
import { Furniture2Component } from './furniture/furniture-2/furniture-2.component';
import { FurnitureDarkComponent } from './furniture/furniture-dark/furniture-dark.component';
import { GameComponent } from './game/game.component';
import { GogglesComponent } from './goggles/goggles.component';
import { GymComponent } from './gym/gym.component';
import { Jewellery1Component } from './jewellery/jewellery-1/jewellery-1.component';
import { Jewellery2Component } from './jewellery/jewellery-2/jewellery-2.component';
import { Jewellery3Component } from './jewellery/jewellery-3/jewellery-3.component';
import { KidsComponent } from './kids/kids.component';
import { MarijuanaComponent } from './marijuana/marijuana.component';
import { Marketplace1Component } from './marketplace/marketplace-1/marketplace-1.component';
import { Marketplace2Component } from './marketplace/marketplace-2/marketplace-2.component';
import { Marketplace3Component } from './marketplace/marketplace-3/marketplace-3.component';
import { Marketplace4Component } from './marketplace/marketplace-4/marketplace-4.component';
import { MedicalComponent } from './medical/medical.component';
import { PerfumeComponent } from './perfume/perfume.component';
import { PetsComponent } from './pets/pets.component';
import { ShoesComponent } from './shoes/shoes.component';
import { ToolsComponent } from './tools/tools.component';
import { Vegetables1Component } from './vegetables/vegetables-1/vegetables-1.component';
import { Vegetables2Component } from './vegetables/vegetables-2/vegetables-2.component';
import { Vegetables3Component } from './vegetables/vegetables-3/vegetables-3.component';
import { VideoSliderComponent } from './video-slider/video-slider.component';
import { WatchComponent } from './watch/watch.component';
import { YogaComponent } from './yoga/yoga.component';
import { NurseryComponent } from './nursery/nursery.component';
import { GradientComponent } from './gradient/gradient.component';
import { VideoComponent } from './video/video.component';
import { FullPageComponent } from './full-page/full-page.component';
import { ParallaxComponent } from './parallax/parallax.component';
import { Vegetables4Component } from './vegetables/vegetables-4/vegetables-4.component';
import { SurfboardComponent } from './surfboard/surfboard.component';
import { DigitalDownloadComponent } from './digital-download/digital-download.component';
import { SingleProductComponent } from './single-product/single-product.component';

@Component({
    selector: 'app-home',
    imports: [CommonModule,
        Fashion1Component, Fashion2Component, Fashion3Component, Fashion4Component, Fashion5Component,
        Fashion6Component, Fashion7Component, Furniture1Component, Furniture2Component, FurnitureDarkComponent,
        Electronic1Component, Electronic2Component, Electronic3Component, Marketplace1Component,
        Marketplace2Component, Marketplace3Component, Marketplace4Component, Vegetables1Component,
        Vegetables2Component, Vegetables3Component, Vegetables4Component, Jewellery1Component,
        Jewellery2Component, Jewellery3Component, BagComponent, WatchComponent, MedicalComponent,
        PerfumeComponent, YogaComponent, BicycleComponent, MarijuanaComponent, ToolsComponent,
        ChristmasComponent, ShoesComponent, KidsComponent, BooksComponent, BeautyComponent,
        SurfboardComponent, GogglesComponent, GymComponent, VideoSliderComponent, PetsComponent,
        NurseryComponent, GameComponent, FlowerComponent, GradientComponent, VideoComponent,
        FullPageComponent, ParallaxComponent, DigitalDownloadComponent, SingleProductComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

  homePage$: Observable<object> = inject(Store).select(ThemeState.homePage) as Observable<object>;
  activeTheme$: Observable<string> = inject(Store).select(ThemeState.activeTheme) as Observable<string>;

  public theme: string;
  public homePage:any

  constructor(private store: Store,
    private route: ActivatedRoute,
    private themeOptionService: ThemeOptionService) {
      this.route.queryParams.subscribe(params => {
        this.themeOptionService.preloader = true;
        this.activeTheme$.subscribe(theme => {
          this.theme = params['theme'] ? params['theme'] : theme;
          if(this.theme){
            this.store.dispatch(new GetHomePage(params['theme'] ? params['theme'] : theme)).subscribe((data: any) => {
              this.homePage = data.theme.homePage;
              this.themeOptionService.preloader = false;
            })
          }
        })
    });
  }
}
