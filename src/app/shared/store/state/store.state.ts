import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";

import { Stores } from "../../interface/store.interface";

import { StoreService } from "../../services/store.service";

import { GetStoreBySlug, GetStores } from "../action/store.action";

export class StoreStateModel {
  store = {
    data: [] as Stores[],
    total: 0
  }
  selectedStore: Stores | null;
}

@State<StoreStateModel>({
  name: "store",
  defaults: {
    store: {
      data: [],
      total: 0
    },
    selectedStore: null
  },
})
@Injectable()
export class StoreState {

  constructor(private storeService: StoreService,
    private router: Router) {}

  @Selector()
  static store(state: StoreStateModel) {
    return state.store;
  }

  @Selector()
  static selectedStore(state: StoreStateModel) {
    return state.selectedStore;
  }

  @Action(GetStores)
  getStores(ctx: StateContext<StoreStateModel>, action: GetStores) {
    this.storeService.skeletonLoader = true;
    return this.storeService.getStores(action.payload).pipe(
      tap({
        next: result => {
          ctx.patchState({
            store: {
              data: result.data,
              total: result?.total ? result?.total : result.data?.length
            }
          });
        },
        complete: () => {
          this.storeService.skeletonLoader = false;
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(GetStoreBySlug)
  getStoreBySlug(ctx: StateContext<StoreStateModel>, { slug }: GetStoreBySlug) {
    return this.storeService.getStores().pipe(
      tap({
        next: results => {
          if(results && results.data) {
            const state = ctx.getState();
            const result = results.data.find(store => store.slug == slug);
  
            ctx.patchState({
              ...state,
              selectedStore: result
            });
          }
        },
        error: err => {
          this.router.navigate(['/404']);
          throw new Error(err?.error?.message);
        }
      })
    );
  }

}
