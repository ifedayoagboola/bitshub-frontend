import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { Select2Module } from 'ng-select2-component';
import { Observable } from 'rxjs';
import { AlertComponent } from '../../../shared/components/widgets/alert/alert.component';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';
import { countryCodes } from '../../../shared/data/country-code';
import { breadcrumb } from '../../../shared/interface/breadcrumb.interface';
import { Values } from '../../../shared/interface/setting.interface';
import { Option } from '../../../shared/interface/theme-option.interface';
import { Register } from '../../../shared/store/action/auth.action';
import { SettingState } from '../../../shared/store/state/setting.state';
import { ThemeOptionState } from '../../../shared/store/state/theme-option.state';
import { CustomValidators } from '../../../shared/validator/password-match';

@Component({
    selector: 'app-register',
    imports: [CommonModule, FormsModule, ReactiveFormsModule,
        TranslateModule, Select2Module, ButtonComponent, AlertComponent],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent {

  @Output() activeForm: EventEmitter<string> = new EventEmitter();

  setting$: Observable<Values> = inject(Store).select(SettingState.setting) as Observable<Values>;
  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;

  public form: FormGroup;
  public codes = countryCodes;
  public tnc = new FormControl(false, [Validators.requiredTrue]);
  public breadcrumb: breadcrumb = {
    title: "create account",
    items: [
      {
        label: "create account",
        active: true
      }
    ]
  }

  constructor(
    private store: Store,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      country_code: new FormControl('91', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      password_confirmation: new FormControl('', [Validators.required]),
    },{validator : CustomValidators.MatchValidator('password', 'password_confirmation')});

  }

  get passwordMatchError() {
    return (
      this.form.getError('mismatch') &&
      this.form.get('password_confirmation')?.touched
    );
  }

  submit() {
    this.form.markAllAsTouched();
    if(this.tnc.invalid){
      return
    }
    if(this.form.valid) {
      this.store.dispatch(new Register(this.form.value)).subscribe({
          complete: () => {
            this.activeForm.emit('login')
          }
        }
      );
    }
  }

  action(action: string){
    this.activeForm.emit(action);
  }

}
