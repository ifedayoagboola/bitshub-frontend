import { Component, inject, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AccountState } from '../../../../store/state/account.state';
import { Observable } from 'rxjs';
import { AccountUser } from '../../../../interface/account.interface';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateUserProfile } from '../../../../store/action/account.action';
import { countryCodes } from '../../../../data/country-code';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Select2Module } from 'ng-select2-component';
import { ButtonComponent } from '../../button/button.component';

@Component({
    selector: 'app-edit-profile-modal',
    imports: [CommonModule, TranslateModule, Select2Module,
        FormsModule, ReactiveFormsModule, ButtonComponent],
    templateUrl: './edit-profile-modal.component.html',
    styleUrl: './edit-profile-modal.component.scss'
})
export class EditProfileModalComponent {

  user$: Observable<AccountUser> = inject(Store).select(AccountState.user) as Observable<AccountUser>;

  public form: FormGroup;
  public closeResult: string;

  public modalOpen: boolean = false;
  public flicker: boolean = false;
  public codes = countryCodes;


  constructor(public modalService: NgbModal,
    private store: Store,
    private formBuilder: FormBuilder) {
      this.user$.subscribe(user => {
        this.flicker = true;
        this.form = this.formBuilder.group({
          name: new FormControl(user?.name, [Validators.required]),
          email: new FormControl(user?.email, [Validators.required, Validators.email]),
          phone: new FormControl(user?.phone, [Validators.required, Validators.pattern(/^[0-9]*$/)]),
          country_code: new FormControl(user?.country_code),
          profile_image_id: new FormControl(user?.profile_image_id),
          _method: new FormControl('PUT'),
        });
        setTimeout( () => this.flicker = false, 200);
      });
  }

  submit(){
    this.form.markAllAsTouched();
    if(this.form.valid) {
      this.store.dispatch(new UpdateUserProfile(this.form.value))
    }
  }
}
