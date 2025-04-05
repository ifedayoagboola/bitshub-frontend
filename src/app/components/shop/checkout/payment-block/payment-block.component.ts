import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Values } from '../../../../shared/interface/setting.interface';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-payment-block',
    imports: [CommonModule],
    templateUrl: './payment-block.component.html',
    styleUrl: './payment-block.component.scss'
})
export class PaymentBlockComponent {

  @Input() setting: Values;

  @Output() selectPaymentMethod: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    // Automatically emit the selectAddress event for the first item if it's available
    if (this.setting && this.setting?.payment_methods?.length! > 0) {
      if(this.setting?.payment_methods?.[0].status) {
        this.selectPaymentMethod.emit(this.setting?.payment_methods?.[0].name);
      }
    }
  }

  set(value: string) {
    this.selectPaymentMethod.emit(value);
  }

}
