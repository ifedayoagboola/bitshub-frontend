import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';
import { breadcrumb } from '../../../shared/interface/breadcrumb.interface';

@Component({
    selector: 'app-order-tracking',
    imports: [TranslateModule, FormsModule, ReactiveFormsModule,
        BreadcrumbComponent, ButtonComponent
    ],
    templateUrl: './order-tracking.component.html',
    styleUrl: './order-tracking.component.scss'
})
export class OrderTrackingComponent {

  public form: FormGroup;

  public breadcrumb: breadcrumb = {
    title: "Order Tracking",
    items: [{ label: 'Order Tracking', active: true }]
  }

  constructor(private store: Store, private formBuilder: FormBuilder,
    private router: Router) {
    this.form = this.formBuilder.group({
      order_number: new FormControl('', [Validators.required]),
      email_or_phone: new FormControl('', [Validators.required])
    });
  }

  submit() {
    this.form.markAllAsTouched();
    if(this.form.valid) {
      this.router.navigate([ 'order/details' ], { queryParams: this.form.value });
    }
  }

}
