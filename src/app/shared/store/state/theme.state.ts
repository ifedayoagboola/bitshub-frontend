import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";

import { Themes } from "../../interface/theme.interface";

import { ThemeOptionService } from "../../services/theme-option.service";
import { ThemeService } from "../../services/theme.service";

import { GetAllThemes, GetHomePage, GetThemes } from "../action/theme.action";

export class ThemesStateModel {
  homePage: object | null;
  activeTheme: string;
  themes = {
    data: [] as Themes[],
  }
}

@State<ThemesStateModel>({
  name: "theme",
  defaults: {
    homePage: null,
    activeTheme: '',
    themes: {
      data: []
    },
  },
})

@Injectable()
export class ThemeState{

  constructor(private themeOptionService: ThemeOptionService,
    private themeService: ThemeService) {}

  @Selector()
  static themes(state: ThemesStateModel) {
    return state.themes;
  }

  @Selector()
  static homePage(state: ThemesStateModel) {
    return state.homePage;
  }

  @Selector()
  static activeTheme(state: ThemesStateModel) {
    return state.activeTheme;
  }

  @Action(GetAllThemes)
  getAllThemes(ctx: StateContext<ThemesStateModel>) {
    return this.themeService.getThemes().pipe(
      tap({
        next: (result) => {
         ctx.patchState({
            themes: {
               data: result.data
            },
         });
        },
        error: (err) => {
          throw new Error(err?.error?.message);
        },
      })
    );
  }

  @Action(GetThemes)
  getThemes(ctx: StateContext<ThemesStateModel>) {
    return this.themeService.getThemes().pipe(
      tap({
        next: (result) => {
          var activeTheme: string = '';
          result.data?.map(theme => {
            if(theme.status === 1) { activeTheme = theme.slug}
          })

          ctx.patchState({
            homePage: result,
            activeTheme: activeTheme
          });
        },
        error: (err) => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(GetHomePage)
  getHomePage(ctx: StateContext<ThemesStateModel>, action: GetHomePage) {
    // this.themeOptionService.preloader = true;
    return this.themeService.getHomePage(action?.slug).pipe(
      tap({
        next: (result) => {
          ctx.patchState({
            homePage: result
          });
        },
        error: (err) => {
          throw new Error(err?.error?.message);
        },
        complete: () =>{
          // this.themeOptionService.preloader = false;
        }
      })
    );
  }
}
