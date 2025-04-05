import { Component, inject } from '@angular/core';
import { breadcrumb } from '../../../shared/interface/breadcrumb.interface';
import { Select, Store } from '@ngxs/store';
import { CouponState } from '../../../shared/store/state/coupon.state';
import { Observable } from 'rxjs';
import { CouponModel } from '../../../shared/interface/coupon.interface';
import { CouponService } from '../../../shared/services/coupon.service';
import { GetCoupons } from '../../../shared/store/action/coupon.action';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { TranslateModule } from '@ngx-translate/core';
import { NoDataComponent } from '../../../shared/components/widgets/no-data/no-data.component';
import { SkeletonOfferComponent } from './skeleton-offer/skeleton-offer.component';

@Component({
    selector: 'app-offer',
    imports: [CommonModule, TranslateModule, BreadcrumbComponent,
        NoDataComponent, SkeletonOfferComponent],
    templateUrl: './offer.component.html',
    styleUrl: './offer.component.scss'
})
export class OfferComponent {

  public skeletonItems = Array.from({ length: 6 }, (_, index) => index);
  public breadcrumb: breadcrumb = {
    title: "Offers",
    items: [{ label: "Offers", active: true }]
  }

  coupon$: Observable<CouponModel> = inject(Store).select(CouponState.coupon);

  constructor(private store: Store, public couponService: CouponService){
    this.store.dispatch(new GetCoupons({ status: 1 }))
  }

  copyFunction(txt:string){
    navigator.clipboard.writeText(txt);
  }
}
