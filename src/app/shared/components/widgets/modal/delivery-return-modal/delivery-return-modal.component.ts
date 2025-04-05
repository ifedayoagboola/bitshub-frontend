import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../button/button.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-delivery-return-modal',
    imports: [TranslateModule, ButtonComponent],
    templateUrl: './delivery-return-modal.component.html',
    styleUrl: './delivery-return-modal.component.scss'
})
export class DeliveryReturnModalComponent {

  @Input() policy: string;

  constructor(public modal: NgbActiveModal){}
}
