import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {
  Brand,
  BrandModel,
} from '../../../../shared/interface/brand.interface';
import { BrandState } from '../../../../shared/store/state/brand.state';
import { BrandSlider } from '../../../../shared/data/owl-carousel';
import { NoDataComponent } from '../../../../shared/components/widgets/no-data/no-data.component';
import { RouterModule } from '@angular/router';
@Component({
    selector: 'app-theme-brand',
    imports: [CommonModule, CarouselModule, RouterModule, NoDataComponent],
    templateUrl: './theme-brand.component.html',
    styleUrl: './theme-brand.component.scss'
})
export class ThemeBrandComponent {

  brand$: Observable<BrandModel> = inject(Store).select(BrandState.brand);

  @Input() brandIds: number[];
  @Input() bgLight: boolean = false;

  public brands: Brand[] = [];
  public options = BrandSlider;

  ngOnChanges() {
    if (Array.isArray(this.brandIds)) {
      this.brand$.subscribe((brand) => {
        this.brands = brand?.data?.filter((brand) =>
          this.brandIds?.includes(brand?.id)
        );
      });
    }
  }
}
