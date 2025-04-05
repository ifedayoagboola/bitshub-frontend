import { Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';
import { TopBarContent } from '../../../../interface/theme-option.interface';
import SwiperCore from 'swiper';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { CommonModule, isPlatformBrowser } from '@angular/common';

SwiperCore.use([Navigation, Pagination, Autoplay]);

@Component({
    selector: 'app-notice',
    imports: [CommonModule],
    templateUrl: './notice.component.html',
    styleUrl: './notice.component.scss'
})
export class NoticeComponent {

  @ViewChild('swiperContainer', { static: false }) swiperContainer!: ElementRef;
  
  @Input() content: TopBarContent[] | undefined;

  public isBrowser: boolean;
  public swiperConfig: any = {
    slidesPerView: 1,
    navigation: false,
    direction: "vertical",
    autoHeight: true,
    allowTouchMove: true,
    scrollbar: { draggable: true },
    pagination: { clickable: true },
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false }
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    if (this.isBrowser && this.swiperContainer) {
      new SwiperCore(this.swiperContainer.nativeElement, this.swiperConfig);
    }
  }
}
