import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Select2Module } from 'ng-select2-component';
import { countryCodes } from '../../../shared/data/country-code';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';
import { Store } from '@ngxs/store';
import { LoginWithNumber } from '../../../shared/store/action/auth.action';
import { AlertComponent } from '../../../shared/components/widgets/alert/alert.component';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-login-with-number',
    imports: [CommonModule, Select2Module, TranslateModule, ButtonComponent, AlertComponent, RouterModule, FormsModule],
    templateUrl: './login-with-number.component.html',
    styleUrl: './login-with-number.component.scss'
})
export class LoginWithNumberComponent {

  public form: FormGroup;
  public codes = countryCodes;

  @Output() activeForm: EventEmitter<string> = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private store: Store){
    this.form = this.formBuilder.group({
      phone: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      country_code: new FormControl('91', [Validators.required]),
    })
  }

  sendOtp(){
    this.form.markAllAsTouched();
    if(this.form.valid){
      this.store.dispatch(new LoginWithNumber(this.form.value)).subscribe({
        complete: () => {
          this.activeForm.emit('numberOtp');
        }
      })
    }
  }

  backForm(){
    this.activeForm.emit('login');
  }
}
