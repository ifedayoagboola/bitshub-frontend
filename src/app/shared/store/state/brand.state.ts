import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { Brand } from "../../interface/brand.interface";
import { BrandService } from "../../services/brand.service";
import { GetBrandBySlug, GetBrands } from "../action/brand.action";

export class BrandStateModel {
  brand = {
    data: [] as Brand[],
    total: 0
  }
  selectedBrand: Brand | null;
}

@State<BrandStateModel>({
  name: "brand",
  defaults: {
    brand: {
      data: [],
      total: 0
    },
    selectedBrand: null
  },
})

@Injectable()
export class BrandState{

  constructor(private brandService: BrandService) {}

  @Selector()
  static brand(state: BrandStateModel) {
    return state.brand;
  }

  @Selector()
  static selectedBrand(state: BrandStateModel) {
    return state.selectedBrand;
  }
 
  @Action(GetBrands)
  getBrands(ctx: StateContext<BrandStateModel>, action: GetBrands) {
    this.brandService.skeletonLoader = true;
    return this.brandService.getBrands(action.payload).pipe(
      tap({
        next: result => {
          ctx.patchState({
            brand: {
              data: result.data,
              total: result?.total ? result?.total : result.data?.length
            }
          });
        },
        complete: () => {
          this.brandService.skeletonLoader = false;
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(GetBrandBySlug)
  getBrandBySlug(ctx: StateContext<BrandStateModel>, action: GetBrandBySlug) {
    return this.brandService.getBrands().pipe(
      tap({
        next: results => { 
          if(results && results.data) {
            const result = results.data.find(brand => brand.slug == action.slug);
            const state = ctx.getState();
            ctx.patchState({
              ...state,
              selectedBrand: result
            });
          }
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }
}
