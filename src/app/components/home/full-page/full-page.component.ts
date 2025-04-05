import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, Input, PLATFORM_ID, SimpleChanges, ViewChild } from '@angular/core';
import SwiperCore from 'swiper';
import { Autoplay, Mousewheel, Navigation, Pagination } from "swiper/modules";
import { ImageLinkComponent } from '../../../shared/components/widgets/image-link/image-link.component';
import { Banners, FullPage } from '../../../shared/interface/theme.interface';
SwiperCore.use([Navigation, Pagination, Autoplay, Mousewheel]);

@Component({
    selector: 'app-full-page',
    imports: [CommonModule, ImageLinkComponent],
    templateUrl: './full-page.component.html',
    styleUrl: './full-page.component.scss'
})
export class FullPageComponent {
  
  @ViewChild('swiperContainer', { static: false }) swiperContainer!: ElementRef;

  @Input() data?: FullPage;
  @Input() slug?: string;

  public filteredBanners: Banners[] = [];
  public isBrowser: boolean;
  public swiperConfig: any = {
    slidesPerView: 1,
    navigation: false,
    direction: "vertical",
    autoHeight: true,
    mousewheel: true,
    allowTouchMove: true,
    scrollbar: { draggable: true },
    pagination: { clickable: true },
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false }
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnChanges(change: SimpleChanges) {
    if (change['data']?.currentValue) {
      this.filteredBanners = change['data'].currentValue.content?.home_banner?.banners?.filter((banner: Banners) => banner.status) || [];
    }
  }

  ngAfterViewInit() {
    if (this.isBrowser && this.swiperContainer) {
      new SwiperCore(this.swiperContainer.nativeElement, this.swiperConfig);
    }
  }
}
