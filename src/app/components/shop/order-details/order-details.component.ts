import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { mergeMap, switchMap, takeUntil } from 'rxjs/operators';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { NoDataComponent } from '../../../shared/components/widgets/no-data/no-data.component';
import { breadcrumb } from '../../../shared/interface/breadcrumb.interface';
import { Country, CountryModel } from '../../../shared/interface/country.interface';
import { OrderStatusModel } from '../../../shared/interface/order-status.interface';
import { Order } from '../../../shared/interface/order.interface';
import { States, StatesModel } from '../../../shared/interface/state.interface';
import { CurrencySymbolPipe } from '../../../shared/pipe/currency.pipe';
import { GetOrderStatus } from '../../../shared/store/action/order-status.action';
import { OrderTracking } from '../../../shared/store/action/order.action';
import { CountryState } from '../../../shared/store/state/country.state';
import { OrderStatusState } from '../../../shared/store/state/order-status.state';
import { OrderState } from '../../../shared/store/state/order.state';
import { StateState } from '../../../shared/store/state/state.state';

@Component({
    selector: 'app-order-details',
    imports: [TranslateModule, CurrencySymbolPipe, CommonModule,
        RouterModule, BreadcrumbComponent, NoDataComponent
    ],
    templateUrl: './order-details.component.html',
    styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent {

  orderStatus$: Observable<OrderStatusModel> = inject(Store).select(OrderStatusState.orderStatus);
  country$: Observable<CountryModel> = inject(Store).select(CountryState.country) as Observable<CountryModel>;
  state$: Observable<StatesModel> = inject(Store).select(StateState.state) as Observable<StatesModel>;

  private destroy$ = new Subject<void>();

  public order: Order | null;
  public email_or_phone: string;
  public countries: Country[] = [];
  public states: States[] = [];

  public breadcrumb: breadcrumb = {
    title: "Order Details",
    items: [{ label: 'Order Details', active: false }]
  };

  constructor(private store: Store,
    private route: ActivatedRoute,
    private location: Location) {
    this.store.dispatch(new GetOrderStatus());
    this.country$.subscribe(country => this.countries = country.data);
    this.state$.subscribe(state => this.states = state.data);
  }

  ngOnInit() {
    this.route.queryParams
      .pipe(
        switchMap(params => {
            this.email_or_phone = params['email_or_phone'];
            return this.store
                      .dispatch(new OrderTracking({ order_number: params['order_number'].toString(), email_or_phone: params['email_or_phone']}))
                      .pipe(mergeMap(() => this.store.select(OrderState.selectedOrder)))
          }
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(order => {
        this.order = order;
        this.order && (this.order.consumer = order?.guest_order ? order?.guest_order : order?.consumer);
      });
  }

  getCountryName(id: number) {
    return this.countries.find(country => country.id == id)?.name;
  }

  getStateName(id: number) {
    return this.states.find(state => state.id == id)?.name;
  }

  back(){
    this.location.back();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
