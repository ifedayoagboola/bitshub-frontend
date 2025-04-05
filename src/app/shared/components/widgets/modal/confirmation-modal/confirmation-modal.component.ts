import { Component, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { AuthService } from '../../../../services/auth.service';
import { ButtonComponent } from '../../button/button.component';

@Component({
    selector: 'app-confirmation-modal',
    imports: [TranslateModule, ButtonComponent],
    templateUrl: './confirmation-modal.component.html',
    styleUrl: './confirmation-modal.component.scss'
})
export class ConfirmationModalComponent {

  @Output() confirm: EventEmitter<Boolean> = new EventEmitter();

  constructor(public modal: NgbModal, private authService: AuthService, private store: Store, ) { }

  confirmation() {
    this.confirm.emit(true)
  }

}
