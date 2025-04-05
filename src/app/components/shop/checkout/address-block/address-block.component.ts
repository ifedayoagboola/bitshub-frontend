import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserAddress } from '../../../../shared/interface/user.interface';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-address-block',
    imports: [CommonModule, TranslateModule],
    templateUrl: './address-block.component.html',
    styleUrl: './address-block.component.scss'
})
export class AddressBlockComponent {

  @Input() addresses?: UserAddress[] = [];
  @Input() type: string = 'shipping';

  @Output() selectAddress: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnChanges() {
    // Automatically emit the selectAddress event for the first item if it's available
    if (this.addresses && this.addresses.length > 0) {
      const firstAddressId = this.addresses[0].id;
      this.selectAddress.emit(firstAddressId);
    }
  }

  set(event: Event) {
    this.selectAddress.emit(Number((<HTMLInputElement>event.target)?.value));
  }

}
