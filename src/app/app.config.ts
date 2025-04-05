import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { RouterModule, provideRouter } from '@angular/router';

import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { CurrencyPipe } from '@angular/common';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrModule } from 'ngx-toastr';
import { routes } from './app.routes';

import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { GlobalErrorHandlerInterceptor } from './core/interceptors/global-error-handler.interceptor';
import { LoaderInterceptor } from './core/interceptors/loader.interceptor';
import { ErrorService } from './shared/services/error.service';
import { NotificationService } from './shared/services/notification.service';
import { SeoService } from './shared/services/seo.service';
import { SettingService } from './shared/services/setting.service';

// States //
import { AccountState } from './shared/store/state/account.state';
import { AttributeState } from './shared/store/state/attribute.state';
import { AuthState } from './shared/store/state/auth.state';
import { BlogState } from './shared/store/state/blog.state';
import { BrandState } from './shared/store/state/brand.state';
import { CartState } from './shared/store/state/cart.state';
import { CategoryState } from './shared/store/state/category.state';
import { CompareState } from './shared/store/state/compare.state';
import { CountryState } from './shared/store/state/country.state';
import { CouponState } from './shared/store/state/coupon.state';
import { CurrencyState } from './shared/store/state/currency.state';
import { DownloadState } from './shared/store/state/download.state';
import { LoaderState } from './shared/store/state/loader.state';
import { MenuState } from './shared/store/state/menu.state';
import { NotificationState } from './shared/store/state/notification.state';
import { OrderStatusState } from './shared/store/state/order-status.state';
import { OrderState } from './shared/store/state/order.state';
import { PageState } from './shared/store/state/page.state';
import { PaymentDetailsState } from './shared/store/state/payment-details.state';
import { PointState } from './shared/store/state/point.state';
import { ProductState } from './shared/store/state/product.state';
import { QuestionAnswersState } from './shared/store/state/questions-answers.state';
import { RefundState } from './shared/store/state/refund.state';
import { ReviewState } from './shared/store/state/review.state';
import { SettingState } from './shared/store/state/setting.state';
import { StateState } from './shared/store/state/state.state';
import { StoreState } from './shared/store/state/store.state';
import { SubscriptionState } from './shared/store/state/subscription.state';
import { TagState } from './shared/store/state/tag.state';
import { ThemeOptionState } from './shared/store/state/theme-option.state';
import { ThemeState } from './shared/store/state/theme.state';
import { WalletState } from './shared/store/state/wallet.state';
import { WishlistState } from './shared/store/state/wishlist.state';
import { ServerInterceptor } from './core/interceptors/server.interceptor';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

export const appConfig: ApplicationConfig = {
  providers: [
    CurrencyPipe,
    ErrorService,
    SeoService,
    NotificationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalErrorHandlerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ServerInterceptor,
    //   multi: true,
    // },
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      CarouselModule,
      LoadingBarRouterModule,
      ToastrModule.forRoot({
        positionClass: 'toast-top-center',
        preventDuplicates: true
      }),
      TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'en'
    }),

      NgxsModule.forRoot([
        AccountState,
        AttributeState,
        BlogState,
        BrandState,
        CartState,
        CategoryState,
        CompareState,
        CountryState,
        CouponState,
        CurrencyState,
        DownloadState,
        LoaderState,
        MenuState,
        NotificationState,
        OrderState,
        OrderStatusState,
        PageState,
        PaymentDetailsState,
        PointState,
        ProductState,
        QuestionAnswersState,
        RefundState,
        ReviewState,
        SettingState,
        StateState,
        StoreState,
        SubscriptionState,
        TagState,
        ThemeOptionState,
        ThemeState,
        WalletState,
        WishlistState
      ]),
      NgxsModule.forFeature([AuthState]),
      RouterModule.forRoot(routes , {
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
      NgxsStoragePluginModule.forRoot({
        keys: [
          "auth",
          'account',
          "theme_option",
          "theme",
          "setting",
          "cart"
        ]
      })
    ),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ]
};
