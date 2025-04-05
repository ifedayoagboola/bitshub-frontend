import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { Coupon } from "../../interface/coupon.interface";
import { CouponService } from "../../services/coupon.service";
import { GetCoupons } from "../action/coupon.action";

export class CouponStateModel {
  coupon = {
    data: [] as Coupon[],
    total: 0
  }
}

@State<CouponStateModel>({
  name: "coupon",
  defaults: {
    coupon: {
      data: [],
      total: 0
    },
  },
})
@Injectable()
export class CouponState {

  constructor(private couponService: CouponService) {}

  @Selector()
  static coupon(state: CouponStateModel) {
    return state.coupon;
  }

  @Action(GetCoupons)
  getCoupons(ctx: StateContext<CouponStateModel>, action: GetCoupons) {
    this.couponService.skeletonLoader = true;
    return this.couponService.getCoupons(action.payload).pipe(
      tap({
        next: result => {
          ctx.patchState({
            coupon: {
              data: result.data,
              total: result?.total ? result?.total : result.data?.length
            }
          });
        },
        complete: () => {
          this.couponService.skeletonLoader = false;
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

}
