
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { tap } from "rxjs";

import { Product, ProductModel } from "../../interface/product.interface";

import { ProductService } from "../../services/product.service";
import { ThemeOptionService } from "../../services/theme-option.service";

import { GetCategoryProducts, GetMenuProducts, GetMoreProduct, GetProductByIds, GetProductBySearch,
         GetProductBySearchList,
         GetProductBySlug, GetProducts, GetRelatedProducts, GetStoreProducts } from "../action/product.action";
import { Category } from "../../interface/category.interface";

export class ProductStateModel {
  product = {
    data: [] as Product[],
    total: 0
  }
  selectedProduct: Product | null;
  categoryProducts: Product[] | [];
  relatedProducts: Product[] | [];
  storeProducts: Product[] | [];
  dealProducts: Product[] | [];
  menuProducts: Product[] | [];
  productBySearch: Product[] | [];
  productBySearchList: Product[] | [];
  productByIds: Product[] | [];
  moreProduct:  Product[] | [];
}

@State<ProductStateModel>({
  name: "product",
  defaults: {
    product: {
      data: [],
      total: 0
    },
    selectedProduct: null,
    categoryProducts: [],
    relatedProducts: [],
    storeProducts: [],
    dealProducts: [],
    menuProducts: [],
    productBySearch: [],
    productBySearchList: [],
    productByIds: [],
    moreProduct: []
  },
})

@Injectable()
export class ProductState{

  constructor(private store: Store, private router: Router,
    private productService: ProductService, private themeOptionService: ThemeOptionService) {}

  @Selector()
  static product(state: ProductStateModel) {
    return state.product;
  }

  @Selector()
  static productByIds(state: ProductStateModel) {
    return state.productByIds;
  }

  @Selector()
  static productBySearch(state: ProductStateModel) {
    return state.productBySearch;
  }

  @Selector()
  static productBySearchList(state: ProductStateModel) {
    return state.productBySearchList;
  }

  @Selector()
  static selectedProduct(state: ProductStateModel) {
    return state.selectedProduct;
  }

  @Selector()
  static relatedProducts(state: ProductStateModel) {
    return state.relatedProducts;
  }

  @Selector()
  static categoryProducts(state: ProductStateModel) {
    return state.categoryProducts;
  }

  @Selector()
  static storeProducts(state: ProductStateModel) {
    return state.storeProducts;
  }

  @Selector()
  static menuProducts(state: ProductStateModel) {
    return state.menuProducts;
  }

  @Selector()
  static moreProduct(state: ProductStateModel) {
    return state.moreProduct;
  }


  @Action(GetProducts)
  getProducts(ctx: StateContext<ProductStateModel>, action: GetProducts) {
    this.productService.skeletonLoader = true;
    return this.productService.getProducts(action.payload).pipe(

      tap({
        next: (result: ProductModel) => {
          let products = result.data || [];
          if(action?.payload) {
            // Note:- For Internal filter purpose only, once you apply filter logic on server side then you can remove  it as per your requirement.
            // Note:- we have covered only few filters as demo purpose
            products = result.data.filter(product =>
              (action?.payload?.['store_slug'] && product?.store?.slug == action?.payload?.['store_slug']) ||
              (
                action?.payload?.['category'] && product?.categories?.length &&
                product?.categories?.some(category => action?.payload?.['category']?.split(',')?.includes(category.slug))
              )
            )

            products = products.length ? products : result.data;

            if(action?.payload?.['sortBy']) {
              if(action?.payload?.['sortBy'] === 'asc') {
                products = products.sort((a, b) => {
                  if (a.id < b.id) {
                    return -1;
                  } else if (a.id > b.id) {
                    return 1;
                  }
                  return 0;
                })
              } else if(action?.payload?.['sortBy'] === 'desc') {
                products = products.sort((a, b) => {
                  if (a.id > b.id) {
                    return -1;
                  } else if (a.id < b.id) {
                    return 1;
                  }
                  return 0;
                })
              } else if (action?.payload?.['sortBy'] === 'a-z') {
                products = products.sort((a, b) => {
                  if (a.name < b.name) {
                    return -1;
                  } else if (a.name > b.name) {
                    return 1;
                  }
                  return 0;
                })
              } else if (action?.payload?.['sortBy'] === 'z-a') {
                products = products.sort((a, b) => {
                  if (a.name > b.name) {
                    return -1;
                  } else if (a.name < b.name) {
                    return 1;
                  }
                  return 0;
                })
              } else if (action?.payload?.['sortBy'] === 'low-high') {
                products = products.sort((a, b) => {
                  if (a.sale_price < b.sale_price) {
                    return -1;
                  } else if (a.price > b.price) {
                    return 1;
                  }
                  return 0;
                })
              } else if (action?.payload?.['sortBy'] === 'high-low') {
                products = products.sort((a, b) => {
                  if (a.sale_price > b.sale_price) {
                    return -1;
                  } else if (a.price < b.price) {
                    return 1;
                  }
                  return 0;
                })
              }
            } else if(!action?.payload?.['ids']) {
              products = products.sort((a, b) => {
                if (a.id < b.id) {
                  return -1;
                } else if (a.id > b.id) {
                  return 1;
                }
                return 0;
              })
            }

            if(action?.payload?.['search']) {
              products = products.filter(product => product.name.toLowerCase().includes(action?.payload?.['search'].toLowerCase()))
            }

            if(action?.payload?.['brand']){
              products = products.filter(product => product?.brand?.slug === action?.payload?.['brand'])

            }
          }

          ctx.patchState({
            product: {
              data: products,
              total: products.length ? products.length : result.data.length
            }
          });
        },
        complete: () => {
          this.productService.skeletonLoader = false;
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(GetProductByIds)
  getProductByIds(ctx: StateContext<ProductStateModel>, action: GetProductByIds) {
    return this.productService.getProducts(action.payload).pipe(
      tap({
        next: (result: ProductModel) => {
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            productByIds: result.data
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(GetProductBySlug)
  getProductBySlug(ctx: StateContext<ProductStateModel>, { slug }: GetProductBySlug) {
    this.themeOptionService.preloader = true;
    return this.productService.getProducts().pipe(

      tap({
        next: results => {
          if(results && results.data) {
            const result = results.data.find(product => product.slug == slug)!;

            result.related_products = result.related_products && result.related_products.length ? result.related_products : [];
            result.cross_sell_products = result.cross_sell_products && result.cross_sell_products.length ? result.cross_sell_products : [];

            const ids = [...result.related_products, ...result.cross_sell_products];
            const categoryIds = [...result?.categories?.map(category => category.id)];
            this.store.dispatch(new GetRelatedProducts({ids: ids?.join(','), category_ids: categoryIds?.join(','), status: 1}));

            const state = ctx.getState();
            ctx.patchState({
              ...state,
              selectedProduct: result
            });
          }
        },
        complete: () => {
          this.themeOptionService.preloader = false;
        },
        error: err => {
          this.router.navigate(['/404']);
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(GetRelatedProducts)
  getRelatedProducts(ctx: StateContext<ProductStateModel>, action: GetProducts) {
    this.themeOptionService.preloader = true;
    return this.productService.getProducts(action.payload).pipe(
      tap({
        next: (result: ProductModel) => {
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            relatedProducts: result.data
          });
        },
        complete: () => {
          this.themeOptionService.preloader = false;
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(GetCategoryProducts)
  getCategoryProducts(ctx: StateContext<ProductStateModel>, action: GetProducts) {
    this.productService.skeletonCategoryProductLoader = true;
    return this.productService.getProducts(action.payload).pipe(
      tap({
        next: (result) => {
          const state = ctx.getState();

          result.data.map(product => {
            product['categories_ids']= product?.categories?.map(category => category.id)
          })

          let products = result.data.filter(product => product?.categories_ids?.includes(action.payload!['category_id']));
          products.splice(action.payload!['paginate']);

          ctx.patchState({
            ...state,
            product: {
              data: [...state.product.data, ...result.data],
              total: state.product.data.length + result.data.length
            },
            categoryProducts: products
          });
          this.productService.skeletonCategoryProductLoader = false;
        },
        complete: () => {
          this.productService.skeletonCategoryProductLoader = false;
          this.themeOptionService.preloader = false;
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(GetStoreProducts)
  getStoreProducts(ctx: StateContext<ProductStateModel>, action: GetProducts) {
    return this.productService.getProducts(action.payload).pipe(
      tap({
        next: (result: ProductModel) => {
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            storeProducts: result.data
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(GetMenuProducts)
  getMenuProducts(ctx: StateContext<ProductStateModel>, action: GetMenuProducts) {
    return this.productService.getProducts(action.payload).pipe(
      tap({
        next: (result: ProductModel) => {
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            menuProducts: result.data
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(GetProductBySearch)
  getProductBySearch(ctx: StateContext<ProductStateModel>, action: GetProductBySearch) {
    this.productService.searchSkeleton = true;
    return this.productService.getProducts(action.payload).pipe(
      tap({
        next: (result) => {
          let products;
          if(action?.payload?.['search']) {
            products = result.data.filter(product => product.name.toLowerCase().includes(action?.payload?.['search'].toLowerCase()))
          } else {
            products = result.data;
          }

          ctx.patchState({
            productBySearch: products.splice(0,4),
          });
        },
        complete: () => {
          this.productService.searchSkeleton = false;
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(GetProductBySearchList)
  getProductBySearchList(ctx: StateContext<ProductStateModel>, action: GetProductBySearchList) {
    this.productService.searchSkeleton = true;
    return this.productService.getProductBySearchList(action.payload).pipe(
      tap({
        next: (result) => {
          ctx.patchState({
            productBySearchList: result.data,
          });
        },
        complete: () => {
          this.productService.searchSkeleton = false;
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(GetMoreProduct)
  getMoreProduct(ctx: StateContext<ProductStateModel>, action: GetMoreProduct) {
    return this.productService.getProducts(action.payload).pipe(
      tap({
        next: (result: ProductModel) => {
          const state = ctx.getState();

          result.data.map(product => {
            product['categories_ids']= product.categories.map(category => category.id)
          })

          let filteredProducts = result.data.filter(product =>
            action.payload!['category_id']?.some((category_id: number) => product.categories_ids.includes(category_id))
          );

          const page = action.payload!['page']; // e.g., 1 for the first page
          const itemsPerPage = action.payload!['paginate']; // e.g., 4 items per page

          const startIndex = (page - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;

          let paginatedProducts = filteredProducts.length ? filteredProducts : result.data.slice(startIndex, endIndex);
          if(action.value){
            ctx.patchState({
              moreProduct: [...state.moreProduct, ...paginatedProducts]
            });
          }else{
            ctx.patchState({
              moreProduct: [...paginatedProducts]
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
