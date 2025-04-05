import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { AlertComponent } from '../../../shared/components/widgets/alert/alert.component';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { breadcrumb } from '../../../shared/interface/breadcrumb.interface';
import { ForgotPassword } from '../../../shared/store/action/auth.action';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';

@Component({
    selector: 'app-forgot-password',
    imports: [CommonModule, FormsModule, ReactiveFormsModule,
        TranslateModule, AlertComponent, ButtonComponent],
    templateUrl: './forgot-password.component.html',
    styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  @Output() activeForm: EventEmitter<string> = new EventEmitter();

  public form: FormGroup;
  public validate: boolean = false;
  public breadcrumb: breadcrumb = {
    title: "forgot password",
    items: [
      {
        label: "forgot password",
        active: true
      }
    ]
  }

  constructor(private store: Store,public formBuilder: FormBuilder, private router: Router){
    this.form = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]]
    });
  }

  submit(){
    this.form.markAllAsTouched();
    if(this.form.valid){
      this.store.dispatch(new ForgotPassword(this.form.value)).subscribe({
        complete: () => {
          this.activeForm.emit('otp');
        }
      })
    }
  }

  get email(){
    return this.form.get('email')
  }

  backForm(){
    this.activeForm.emit('login');
  }
}
