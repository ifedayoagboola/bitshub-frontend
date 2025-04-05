import { Component, Input } from '@angular/core';
import { UserAddress } from '../../../../interface/user.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { DeleteAddress } from '../../../../store/action/account.action';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../button/button.component';

@Component({
    selector: 'app-delete-address-modal',
    imports: [CommonModule, TranslateModule, ButtonComponent],
    templateUrl: './delete-address-modal.component.html',
    styleUrl: './delete-address-modal.component.scss'
})
export class DeleteAddressModalComponent {

  @Input() userAddress: UserAddress;

  public userAction = {};

  constructor(public modal: NgbActiveModal, private store: Store) { }

  ngOnInit(){
    if(this.userAddress){
      this.userAction = {
      data: this.userAddress
    };
    }
  }

  delete() {
    this.store.dispatch(new DeleteAddress(this.userAddress.id));
  }
}
