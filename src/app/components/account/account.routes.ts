import { Routes } from "@angular/router";
import { AccountComponent } from "./account.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NotificationComponent } from "./notification/notification.component";
import { BankDetailsComponent } from "./bank-details/bank-details.component";
import { WalletComponent } from "./wallet/wallet.component";
import { PointComponent } from "./point/point.component";
import { OrdersComponent } from "./orders/orders.component";
import { DetailsComponent } from "./orders/details/details.component";
import { DownloadsComponent } from "./downloads/downloads.component";
import { RefundComponent } from "./refund/refund.component";
import { AddressesComponent } from "./addresses/addresses.component";

export const account: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'notifications',
        component: NotificationComponent
      },
      {
        path: 'bank-details',
        component: BankDetailsComponent
      },
      {
        path: 'wallet',
        component: WalletComponent
      },
      {
        path: 'point',
        component: PointComponent
      },
      {
        path: 'order',
        component: OrdersComponent
      },
      {
        path: 'order/details/:id',
        component: DetailsComponent
      },
      {
        path: 'downloads',
        component: DownloadsComponent
      },
      {
        path: 'refund',
        component: RefundComponent
      },
      {
        path: 'addresses',
        component: AddressesComponent
      },
    ]
  }
]
