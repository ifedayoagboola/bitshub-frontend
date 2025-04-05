import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { CustomValidators } from '../../../../validator/password-match';
import { UpdateUserPassword } from '../../../../store/action/account.action';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../button/button.component';

@Component({
    selector: 'app-change-password-modal',
    imports: [CommonModule, TranslateModule, FormsModule, ReactiveFormsModule, ButtonComponent],
    templateUrl: './change-password-modal.component.html',
    styleUrl: './change-password-modal.component.scss'
})
export class ChangePasswordModalComponent {

  public form: FormGroup;

  constructor(public modalService: NgbModal,
    private store: Store,
    private formBuilder: FormBuilder) {
      this.form = this.formBuilder.group({
        current_password: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        password_confirmation: new FormControl('', [Validators.required])
      },{validator : CustomValidators.MatchValidator('password', 'password_confirmation')})
  }

  get passwordMatchError() {
    return (
      this.form?.getError('mismatch') &&
      this.form?.get('password_confirmation')?.touched
    );
  }

  submit(){
    this.form.markAllAsTouched();
    if(this.form.valid) {
      this.store.dispatch(new UpdateUserPassword(this.form.value)).subscribe({
        complete: () => {
          this.form.reset();
        }
      });
    }
  }
}
