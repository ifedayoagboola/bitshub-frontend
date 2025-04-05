import { CommonModule, DatePipe, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject, mergeMap, of, switchMap, takeUntil } from 'rxjs';
import { PayModalComponent } from '../../../../shared/components/widgets/modal/pay-modal/pay-modal.component';
import { RefundModalComponent } from '../../../../shared/components/widgets/modal/refund-modal/refund-modal.component';
import { OrderStatusModel } from '../../../../shared/interface/order-status.interface';
import { Order } from '../../../../shared/interface/order.interface';
import { Product } from '../../../../shared/interface/product.interface';
import { CurrencySymbolPipe } from '../../../../shared/pipe/currency.pipe';
import { GetOrderStatus } from '../../../../shared/store/action/order-status.action';
import { DownloadInvoice, ViewOrder } from '../../../../shared/store/action/order.action';
import { OrderStatusState } from '../../../../shared/store/state/order-status.state';
import { OrderState } from '../../../../shared/store/state/order.state';
import { TextConverterPipe } from '../../../../shared/pipe/text-converter.pipe';

@Component({
    selector: 'app-details',
    imports: [CommonModule, TranslateModule, RouterModule,
        CurrencySymbolPipe, NgbModule, TextConverterPipe],
    providers: [DatePipe],
    templateUrl: './details.component.html',
    styleUrl: './details.component.scss'
})
export class DetailsComponent {

  orderStatus$: Observable<OrderStatusModel> = inject(Store).select(OrderStatusState.orderStatus);

  private destroy$ = new Subject<void>();

  public order: Order;
  public isLogin: boolean;

  constructor(private store: Store,
    private route: ActivatedRoute,
    private modal: NgbModal,
    private datePipe: DatePipe,
    private location: Location) {
    this.store.dispatch(new GetOrderStatus());
  }

  ngOnInit() {
    this.isLogin = !!this.store.selectSnapshot(state => state.auth && state.auth.access_token)
    this.route.params
      .pipe(
        switchMap(params => {
            if(!params['id']) return of();
            return this.store
                      .dispatch(new ViewOrder(params['id']))
                      .pipe(mergeMap(() => this.store.select(OrderState.selectedOrder)))
          }
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(order => {
        this.order = order!;
        if(this.order && this.order?.order_status_activities){
          this.order?.order_status_activities?.map(actStatus => {
              this.orderStatus$.subscribe(res => {
                res.data.map(status => {
                  if(actStatus.status == status.name){
                    let convertDate = this.datePipe.transform(actStatus?.changed_at, 'dd MMM yyyy hh:mm:a')!
                    status['activities_date'] = convertDate;
                  }
                })
            })
          })
        }
      });
  }

  openPayModal(order: Order){
    const modal = this.modal.open(PayModalComponent, { centered: true });
    modal.componentInstance.orderDetails = order;
  }

  openRefundModal(product: Product, order_id: number){
    const modal = this.modal.open(RefundModalComponent, { centered: true, windowClass: 'theme-modal-2 refund-modal' });
    modal.componentInstance.productDetails = product;
    modal.componentInstance.orderId = order_id;
  }

  download(id: number){
    this.store.dispatch(new DownloadInvoice({order_number: id}))
  }

  back(){
    this.location.back();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
