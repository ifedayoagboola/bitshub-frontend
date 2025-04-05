import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";

import {  Faq, Page, ContactUsModel } from "../../interface/page.interface";

import { PageService } from "../../services/page.service";

import { GetFaqs, GetPageBySlug, GetPages, ContactUs } from "../action/page.action";

export class PageStateModel {
  page = {
    data: [] as Page[],
    total: 0
  }
  faq = {
    data: [] as Faq[],
    total: 0
  }
  selectedPage: Page | null;
}

@State<PageStateModel>({
  name: "page",
  defaults: {
    page: {
      data: [],
      total: 0
    },
    faq: {
      data: [],
      total: 0
    },
    selectedPage: null,
  },
})
@Injectable()
export class PageState {

  constructor(private pageService: PageService ) {}

  @Selector()
  static page(state: PageStateModel) {
    return state.page;
  }

  @Selector()
  static faq(state: PageStateModel) {
    return state.faq;
  }

  @Selector()
  static selectedPage(state: PageStateModel) {
    return state.selectedPage;
  }

  @Action(GetPages)
  getPages(ctx: StateContext<PageStateModel>, action: GetPages) {
    return this.pageService.getPages(action.payload).pipe(
      tap({
        next: result => {
          ctx.patchState({
            page: {
              data: result.data,
              total: result?.total ? result?.total : result.data?.length
            }
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(GetPageBySlug)
  getPageBySlug(ctx: StateContext<PageStateModel>, { slug }: GetPageBySlug) {
    this.pageService.skeletonLoader = true;
    return this.pageService.getPages().pipe(
      tap({
        next: results => {
          if(results && results.data) {
            const state = ctx.getState();
            const result = results.data.find(page => page.slug == slug);
  
            ctx.patchState({
              ...state,
              selectedPage: result
            });
          }
        },
        complete: () => {
          this.pageService.skeletonLoader = false;
        },
        error: err => {

          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(GetFaqs)
  getFaqs(ctx: StateContext<PageStateModel>) {
    this.pageService.skeletonLoader = true;
    return this.pageService.getFaqs().pipe(
      tap({
        next: result => {
          ctx.patchState({
            faq: {
              data: result.data,
              total: result?.total ? result?.total : result.data?.length
            }
          });
        },
        complete: () => {
          this.pageService.skeletonLoader = false;
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(ContactUs)
  contactUs(ctx: StateContext<ContactUsModel>, { payload }: ContactUs) {
    // contact api logic here
  }

}
