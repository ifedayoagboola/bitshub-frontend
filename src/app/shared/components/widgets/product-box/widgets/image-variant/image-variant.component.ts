import { Component, inject, Input } from '@angular/core';
import { Attachment } from '../../../../../interface/attachment.interface';
import { Product } from '../../../../../interface/product.interface';
import { RouterModule } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { Select, Store } from '@ngxs/store';
import { ThemeState } from '../../../../../store/state/theme.state';
import { ThemeOptionState } from '../../../../../store/state/theme-option.state';
import { Observable } from 'rxjs';
import { Option } from '../../../../../interface/theme-option.interface';

@Component({
    selector: 'app-image-variant',
    imports: [RouterModule, CarouselModule, CommonModule],
    templateUrl: './image-variant.component.html',
    styleUrl: './image-variant.component.scss'
})
export class ProductBoxImageVariantComponent {

  @Input() thumbnail: Attachment | null;
  @Input() gallery_images: any;
  @Input() product: Product;

  themeOptions$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions);

  public variant: string = 'image_zoom'
  public flipImage: Attachment[] = [];
  public imageType = ['image/apng', 'image/avif', 'image/gif', 'image/jpeg', 'image/png', 'image/svg', 'image/svg+xml', 'image/webp']
  public customOptions: OwlOptions = {
    loop: true,
    autoplayTimeout: 1200,
    items: 1,
    autoplay: false // Initialize autoplay as false
  };

  ngOnInit() {

    this.themeOptions$.subscribe((options) => {
     this.variant = options.product.image_variant
    })

    this.flipImage = this.gallery_images.map((image: any) => {
      let images
      if(this.imageType.includes(image.mime_type)){
        images = image;
      }
      return images!
    })
  }

  startAutoplay() {
    this.thumbnail = null
    this.customOptions = {...this.customOptions, autoplay : true};
  }

  stopAutoplay() {
    this.customOptions = {...this.customOptions, autoplay : false};
  }

}
