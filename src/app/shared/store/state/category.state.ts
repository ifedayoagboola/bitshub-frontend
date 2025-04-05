import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { Category } from "../../interface/category.interface";
import { CategoryService } from "../../services/category.service";
import { GetCategories, GetCategory, GetCategoryBySlug, GetFooterCategories, GetHeaderCategories, GetProductCategory, GetSearchByCategory } from "../action/category.action";

export class CategoryStateModel {
  category = {
    data: [] as Category[],
    total: 0
  }
  categories = {
    data: [] as Category[],
    total: 0
  }
  footerCategory = {
    data: [] as Category[],
    total: 0
  }
  headerCategory = {
    data: [] as Category[],
    total: 0
  }
  productCategory = {
    data: [] as Category[],
    total: 0
  }
  searchByCategory: Category[]
  selectedCategory: Category | null
}

@State<CategoryStateModel>({
  name: "category",
  defaults: {
    category: {
      data: [],
      total: 0
    },
    categories: {
      data: [],
      total: 0
    },
    footerCategory: {
      data: [],
      total: 0
    },
    headerCategory: {
      data: [],
      total: 0
    },
    productCategory: {
      data: [],
      total: 0
    },
    searchByCategory: [],
    selectedCategory: null
  },
})

@Injectable()
export class CategoryState{

  constructor(private categoryService: CategoryService) {}

  @Selector()
  static category(state: CategoryStateModel) {
    return state.category;
  }

  @Selector()
  static categories(state: CategoryStateModel) {
    return state.categories;
  }

  @Selector()
  static footerCategory(state: CategoryStateModel) {
    return state.footerCategory;
  }

  @Selector()
  static headerCategory(state: CategoryStateModel) {
    return state.headerCategory;
  }

  @Selector()
  static productCategory(state: CategoryStateModel) {
    return state.productCategory;
  }

  @Selector()
  static subCategory(state: CategoryStateModel) {
    return state.category;
  }

  @Selector()
  static searchByCategory(state: CategoryStateModel) {
    return state.searchByCategory;
  }

  @Selector()
  static selectedCategory(state: CategoryStateModel) {
    return state.selectedCategory;
  }

  @Action(GetCategories)
  getCategories(ctx: StateContext<CategoryStateModel>, action: GetCategories) {
    return this.categoryService.getCategories(action.payload).pipe(
      tap({
        next: result => {
          if(result && result.data) {
            ctx.patchState({
             categories: {
               data: result.data,
               total: result?.total ? result?.total : result.data.length
             }
           });
          }
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(GetCategory)
  getCategory(ctx: StateContext<CategoryStateModel>, action: GetCategory) {
    return this.categoryService.getCategories(action.payload).pipe(
      tap({
        next: result => {
          if(result && result.data) {
            ctx.patchState({
              category: {
                data: result.data,
                total: result?.total ? result?.total : result.data.length
              }
            });
          }
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(GetFooterCategories)
  GetFooterCategories(ctx: StateContext<CategoryStateModel>, action: GetFooterCategories) {
    return this.categoryService.getCategories(action.payload).pipe(
      tap({
        next: result => {
          if(result && result.data) {
            ctx.patchState({
              footerCategory: {
                data: result.data,
                total: result?.total ? result?.total : result.data.length
              }
            });
          }
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(GetHeaderCategories)
  GetHeaderCategories(ctx: StateContext<CategoryStateModel>, action: GetHeaderCategories) {
    return this.categoryService.getCategories(action.payload).pipe(
      tap({
        next: result => {
          if(result && result.data) {
            ctx.patchState({
              headerCategory: {
                data: result.data,
                total: result?.total ? result?.total : result.data.length
              }
            });
          }
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(GetProductCategory)
  GetProductCategory(ctx: StateContext<CategoryStateModel>, action: GetProductCategory) {
    return this.categoryService.getCategories(action.payload).pipe(
      tap({
        next: result => {
          ctx.patchState({
            productCategory: {
              data: result.data,
              total: result?.total ? result?.total : result.data.length
            }
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

   @Action(GetSearchByCategory)
  getSearchByCategory(ctx: StateContext<CategoryStateModel>, action: GetSearchByCategory) {
    this.categoryService.searchSkeleton = true;
    return this.categoryService.getCategories(action.payload).pipe(
      tap({
        next: result => {
          let categories;
          if(action?.payload?.['search']) {
            categories = result.data.filter(category => category.name.toLowerCase().includes(action?.payload?.['search'].toLowerCase()))
          } else {
            categories = result.data;
          }
          ctx.patchState({
            searchByCategory: categories ? categories.splice(0,4) : []
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        },
        complete: () => {
          this.categoryService.searchSkeleton = false;
        }
      })
    );
  }

  @Action(GetCategoryBySlug)
  getCategoryBySlug(ctx: StateContext<CategoryStateModel>, action: GetCategoryBySlug) {
    return this.categoryService.getCategories().pipe(
      tap({
        next: results => {
          if(results && results.data) {
            const result = results.data.find(category => category.slug == action.slug);
            const state = ctx.getState();
            ctx.patchState({
              ...state,
              selectedCategory: result
            });
          }
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }


  getSubCategory(category: Category, ids: number[]) {
    if(ids?.includes(category.id)) {
      if(category){
        return category;
      }
    }

    if(category.subcategories?.length){
      category.subcategories.map((subcategory) => {
        this.getSubCategory(subcategory, ids)
      })
    }
  }
}
