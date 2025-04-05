import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { of, tap } from "rxjs";
import { Cart, CartModel } from "../../interface/cart.interface";
import { CartService } from "../../services/cart.service";
import { NotificationService } from "../../services/notification.service";
import {
  AddToCart, AddToCartLocalStorage, ClearCart, CloseStickyCart, DeleteCart,
  GetCartItems, ReplaceCart, SyncCart, ToggleSidebarCart, UpdateCart
} from "../action/cart.action";

export interface CartStateModel {
  items: Cart[];
  total: number;
  is_digital_only: boolean | number | null;
  stickyCartOpen: boolean;
  sidebarCartOpen: boolean;
}

@State<CartStateModel>({
  name: "cart",
  defaults: {
    items: [],
    total: 0,
    is_digital_only: null,
    stickyCartOpen: false,
    sidebarCartOpen: false
  },
})

@Injectable()
export class CartState {

  constructor(private cartService: CartService,
    private notificationService: NotificationService,
    private store: Store) {
  }

  ngxsOnInit(ctx: StateContext<CartStateModel>) {
    ctx.dispatch(new ToggleSidebarCart(false));
    ctx.dispatch(new CloseStickyCart());
  }

  @Selector()
  static cartItems(state: CartStateModel) {
    return state.items;
  }

  @Selector()
  static cartTotal(state: CartStateModel) {
    return state.total;
  }

  @Selector()
  static cartHasDigital(state: CartStateModel) {
    return state.is_digital_only;
  }

  @Selector()
  static stickyCart(state: CartStateModel) {
    return state.stickyCartOpen;
  }

  @Selector()
  static sidebarCartOpen(state: CartStateModel) {
    return state.sidebarCartOpen;
  }

  @Action(GetCartItems)
  getCartItems(ctx: StateContext<CartStateModel>) {
    // if (!this.store.selectSnapshot(state => state.auth && state.auth.access_token)) {
    //   return;
    // }
    return this.cartService.getCartItems().pipe(
      tap({
        next: result => {
          // Set Selected Variant
          result.items.filter((item: Cart) => {
            if(item?.variation) {
              item.variation.selected_variation = item?.variation?.attribute_values?.map(values => values.value)?.join('/');
            }
          });
          ctx.patchState(result);
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(AddToCart)
  add(ctx: StateContext<CartStateModel>, action: AddToCart) {
     if (action.payload.id) {
      return this.store.dispatch(new UpdateCart(action.payload));
    }

    return this.store.dispatch(new AddToCartLocalStorage(action.payload));
  }

  @Action(AddToCartLocalStorage)
  addToLocalStorage(ctx: StateContext<CartStateModel>, action: AddToCartLocalStorage) {

    let salePrice = action.payload.variation ?  action.payload.variation.sale_price : action.payload.product?.sale_price;
    let result: CartModel = {
      is_digital_only: false,
      items: [{
        id: Number(Math.floor(Math.random() * 10000).toString().padStart(4, '0')), // Generate Random Id
        quantity: action.payload.quantity,
        sub_total: salePrice ? salePrice * action.payload.quantity : 0,
        product: action.payload.product!,
        product_id: action.payload.product_id,
        wholesale_price: null,
        variation: action.payload.variation!,
        variation_id: action.payload.variation_id
      }]
    }

    const state = ctx.getState();
    const cart = [...state.items];
    const index = cart.findIndex(item => item.id === result.items[0].id);

    let output = { ...state };

    if (index == -1) {
      if(!state.items.length){
        output.items = [...state.items, ...result.items]
      }else {
        if(result.items[0].variation){
          if(state.items.find(item => item.variation_id == result.items[0].variation_id)){

            cart.find((item) => {
              if(item.variation_id){
                if(item.variation_id == result.items[0].variation_id){

                const productQty = item?.variation?.quantity;

                if (productQty < item?.quantity + action?.payload.quantity) {
                  this.notificationService.showError(`You can not add more items than available. In stock ${productQty} items.`);
                  return false;
                }

                item.quantity = item?.quantity + result.items[0].quantity;
                item.sub_total = item?.quantity * (item?.variation?.sale_price);
                }
              }
            })
          }else{
            output.items = [...state.items, ...result.items]
          }
        }
        else if(state.items.find(item => item.product_id == result.items[0].product_id)){
          cart.find((item) => {
            if(item.product_id == result.items[0].product_id){
              const productQty = item?.product?.quantity;

              if (productQty < item?.quantity + action?.payload.quantity) {
                this.notificationService.showError(`You can not add more items than available. In stock ${productQty} items.`);
                return false;
              }

              item.quantity = item?.quantity + result.items[0].quantity;
              item.sub_total = item?.quantity * (item.product.sale_price);
            }
          })
        }else{
          output.items = [...state.items, ...result.items]
        }
      }
    }

    // Set Selected Variant
    output.items.filter(item => {
      if(item?.variation) {
        item.variation.selected_variation = item?.variation?.attribute_values?.map(values => values.value)?.join('/');
      }
    });

    // Calculate Total
    output.total = output.items.reduce((prev, curr: Cart) => {
      return (prev + Number(curr.sub_total));
    }, 0);

    output.stickyCartOpen = true;
    output.sidebarCartOpen = true;
    output.is_digital_only = output.items.map(item => item.product && item?.product?.product_type).every(item => item == 'digital');

    ctx.patchState(output);

    setTimeout(() => {
      this.store.dispatch(new CloseStickyCart());
    }, 1500);
  }

  @Action(UpdateCart)
  update(ctx: StateContext<CartStateModel>, action: UpdateCart) {
    const state = ctx.getState();
    const cart = [...state.items];
    const index = cart.findIndex(item => Number(item.id) === Number(action.payload.id));

    if(cart[index]?.variation && action.payload.variation_id &&
      Number(cart[index].id) === Number(action.payload.id) &&
      Number(cart[index]?.variation_id) != Number(action.payload.variation_id)) {

        return this.store.dispatch(new ReplaceCart(action.payload));
    }

    const productQty = cart[index]?.variation ? cart[index]?.variation?.quantity : cart[index]?.product?.quantity;

    if (productQty < cart[index]?.quantity + action?.payload.quantity) {
      this.notificationService.showError(`You can not add more items than available. In stock ${productQty} items.`);
      return false;
    }

    if(cart[index]?.variation) {
      cart[index].variation.selected_variation = cart[index]?.variation?.attribute_values?.map(values => values.value)?.join('/');
    }
    cart[index].quantity = cart[index]?.quantity + action?.payload.quantity;
    cart[index].sub_total = cart[index]?.quantity * (cart[index]?.variation ? cart[index]?.variation?.sale_price : cart[index].product.sale_price);

    if(cart[index].product?.wholesales?.length) {
      let wholesale = cart[index].product.wholesales.find(value => value.min_qty <= cart[index].quantity && value.max_qty >= cart[index].quantity) || null;
      if(wholesale && cart[index].product.wholesale_price_type == 'fixed') {
        cart[index].sub_total = cart[index].quantity * wholesale.value;
        cart[index].wholesale_price = cart[index].sub_total / cart[index].quantity;
      } else if(wholesale && cart[index].product.wholesale_price_type == 'percentage') {
        cart[index].sub_total = cart[index].quantity * (cart[index]?.variation ? cart[index]?.variation?.sale_price : cart[index].product.sale_price);
        cart[index].sub_total = cart[index].sub_total - (cart[index].sub_total * (wholesale.value / 100));
        cart[index].wholesale_price = cart[index].sub_total / cart[index].quantity;
      } else {
        cart[index].sub_total = cart[index]?.quantity * (cart[index]?.variation ? cart[index]?.variation?.sale_price : cart[index].product.sale_price);
        cart[index].wholesale_price = null;
      }
    } else {
      cart[index].sub_total = cart[index]?.quantity * (cart[index]?.variation ? cart[index]?.variation?.sale_price : cart[index].product.sale_price);
      cart[index].wholesale_price = null;
    }

    if (cart[index].quantity < 1) {
      this.store.dispatch(new DeleteCart(action.payload.id!));
      return of();
    }

    let total = state.items.reduce((prev, curr: Cart) => {
      return (prev + Number(curr.sub_total));
    }, 0);

    ctx.patchState({
      ...state,
      is_digital_only: cart.map(item => item.product && item?.product?.product_type).every(item => item == 'digital'),
      total: total
    });

    if (!this.store.selectSnapshot(state => state.auth && state.auth.access_token)) {
      return;
    }
    // return this.cartService.updateCart(action.payload).pipe(
    //   tap({
    //     error: err => {
    //       throw new Error(err?.error?.message);
    //     }
    //   })
    // );
  }

  @Action(ReplaceCart)
  replace(ctx: StateContext<CartStateModel>, action: ReplaceCart) {

    const state = ctx.getState();
    const cart = [...state.items];
    const index = cart.findIndex(item => Number(item.id) === Number(action.payload.id));

    // Update Cart If cart id same but variant id is different
    if(cart[index]?.variation && action.payload.variation_id &&
      Number(cart[index].id) === Number(action.payload.id) &&
      Number(cart[index]?.variation_id) != Number(action.payload.variation_id)) {
      cart[index].variation = action.payload.variation!;
      cart[index].variation_id = action.payload.variation_id;
      cart[index].variation.selected_variation = cart[index]?.variation?.attribute_values?.map(values => values.value)?.join('/')
    }

    cart[index].quantity = 0;

    const productQty = cart[index]?.variation ? cart[index]?.variation?.quantity : cart[index]?.product?.quantity;

    if (productQty < cart[index]?.quantity + action?.payload.quantity) {
      this.notificationService.showError(`You can not add more items than available. In stock ${productQty} items.`);
      return false;
    }

    cart[index].quantity = cart[index]?.quantity + action?.payload.quantity;
    cart[index].sub_total = cart[index]?.quantity * (cart[index]?.variation ? cart[index]?.variation?.sale_price : cart[index].product.sale_price);

    if (cart[index].quantity < 1) {
      this.store.dispatch(new DeleteCart(action.payload.id!));
      return of();
    }

    let total = state.items.reduce((prev, curr: Cart) => {
      return (prev + Number(curr.sub_total));
    }, 0);

    ctx.patchState({
      ...state,
      total: total
    });

    if (!this.store.selectSnapshot(state => state.auth && state.auth.access_token)) {
      return;
    }
  }

  @Action(DeleteCart)
  delete(ctx: StateContext<CartStateModel>, { id }: DeleteCart) {
    const state = ctx.getState();

    let cart = state.items.filter(value => value.id !== id);
    let total = cart.reduce((prev, curr: Cart) => {
      return (prev + Number(curr.sub_total));
    }, 0);

    ctx.patchState({
      items: cart,
      is_digital_only: state.items.map(item => item.product && item?.product?.product_type).every(item => item == 'digital'),
      total: total
    });

    if (!this.store.selectSnapshot(state => state.auth && state.auth.access_token)) {
      return;
    }
  }

  @Action(SyncCart)
  syncCart(ctx: StateContext<CartStateModel>, action: SyncCart) {
    // SyncCart logic here
  }

  @Action(CloseStickyCart)
  closeStickyCart(ctx: StateContext<CartStateModel>) {
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      stickyCartOpen: false,
    });
  }

  @Action(ToggleSidebarCart)
  toggleSidebarCart(ctx: StateContext<CartStateModel>, { value }: ToggleSidebarCart) {
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      sidebarCartOpen: value,
    });
  }

  @Action(ClearCart)
  clearCart(ctx: StateContext<CartStateModel>) {
    if (!this.store.selectSnapshot(state => state.auth && state.auth.access_token)) {
      return ctx.patchState({
        items: [],
        total: 0
      });
    } else {
      return ctx.patchState({
        items: [],
        total: 0
      });
    }
  }
}
