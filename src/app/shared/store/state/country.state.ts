import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { Country } from "../../interface/country.interface";
import { CountryService } from "../../services/country.service";
import { GetCountries } from "../action/country.action";

export class CountryStateModel {
  country = {
    data: [] as Country[]
  }
}

@State<CountryStateModel>({
  name: "country",
  defaults: {
    country: {
      data: []
    }
  },
})
@Injectable()
export class CountryState {
  
  constructor(private countryService: CountryService) {}

  @Selector()
  static country(state: CountryStateModel) {
    return state.country;
  }

  @Selector()
  static countries(state: CountryStateModel) {
    return state?.country?.data?.map(cn => {
      return { label: cn?.name, value: cn?.id }
    });
  }

  @Action(GetCountries)
  getCountries(ctx: StateContext<CountryStateModel>, action: GetCountries) {
    const state = ctx.getState();
    if (state?.country?.data?.length) {
      // If the country has been already loaded
      // we just break the execution
      return true;
    }
    return this.countryService.getCountries().pipe(
      tap({
        next: result => { 
          ctx.patchState({
            country: {
              data: result
            }
          });
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

}
