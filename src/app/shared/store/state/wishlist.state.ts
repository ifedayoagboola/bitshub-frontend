import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { tap } from "rxjs";

import { Product } from "../../interface/product.interface";

import { AuthService } from "../../services/auth.service";
import { NotificationService } from "../../services/notification.service";
import { WishlistService } from "../../services/wishlist.service";

import { GetWishlist, AddToWishlist, DeleteWishlist } from "../action/wishlist.action";

export class WishlistStateModel {
  wishlist = {
    data: [] as Product[],
    total: 0
  }
  wishlistIds: number[]
}

@State<WishlistStateModel>({
  name: "wishlist",
  defaults: {
    wishlist: {
      data: [],
      total: 0
    },
    wishlistIds: []
  },
})

@Injectable()
export class WishlistState {

  constructor(private store: Store, public router: Router,
    private wishlistService: WishlistService,
    private authService: AuthService,
    private notificationService: NotificationService){}

  @Selector()
  static wishlistItems(state: WishlistStateModel) {
    return state.wishlist;
  }

  @Selector()
  static wishlistIds(state: WishlistStateModel) {
    return state.wishlistIds;
  }

  @Action(GetWishlist)
  getWishlistItems(ctx: StateContext<GetWishlist>) {
    this.wishlistService.skeletonLoader = true;
    // if(!this.store.selectSnapshot(state => state.auth && state.auth.access_token)) {
    //   return;
    // }
    return this.wishlistService.getWishlistItems().pipe(
      tap({
        next: result => {
          let ids = result.data.map(product => product.id)
          ctx.patchState({
            wishlist: {
              data: result.data,
              total: result?.total ? result?.total : result.data?.length
            },
            wishlistIds: ids
          });
        },
        complete: () => {
          this.wishlistService.skeletonLoader = false;
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(AddToWishlist)
  add(ctx: StateContext<WishlistStateModel>, action: AddToWishlist){
    // Add Wishlist Logic Here
    this.router.navigate(['/wishlist']);
  }

  @Action(DeleteWishlist)
  delete(ctx: StateContext<WishlistStateModel>, { id }: DeleteWishlist) {
    const state = ctx.getState();
    let item = state.wishlist.data.filter(value => value.id !== id);
    ctx.patchState({
      wishlist: {
        data: item,
        total: state.wishlist.total - 1
      }
    });
  }
}
