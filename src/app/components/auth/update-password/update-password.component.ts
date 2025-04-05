import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { AlertComponent } from '../../../shared/components/widgets/alert/alert.component';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';
import { breadcrumb } from '../../../shared/interface/breadcrumb.interface';
import { UpdatePassword } from '../../../shared/store/action/auth.action';

@Component({
    selector: 'app-update-password',
    imports: [CommonModule, FormsModule, ReactiveFormsModule,
        TranslateModule, AlertComponent, ButtonComponent],
    templateUrl: './update-password.component.html',
    styleUrl: './update-password.component.scss'
})
export class UpdatePasswordComponent {

  @Output() activeForm: EventEmitter<string> = new EventEmitter();

  public form: FormGroup;
  public validate: boolean = false;
  public email: string;
  public token: string;
  public breadcrumb: breadcrumb = {
    title: "update password",
    items: [
      {
        label: "update password",
        active: true
      }
    ]
  }

  constructor(private store: Store,public formBuilder: FormBuilder, private router: Router){
    this.email = this.store.selectSnapshot(state => state.auth.email);
    this.token = this.store.selectSnapshot(state => state.auth.token);
    if(!this.email && !this.token) this.activeForm.emit('login');
    this.form = this.formBuilder.group({
      newPassword: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]]
    });
  }

  submit(){
    this.form.markAllAsTouched();
    if(this.form.valid){
      this.store.dispatch(new UpdatePassword({
        email: this.email,
        token: this.token,
        password: this.form.value.newPassword,
        password_confirmation: this.form.value.confirmPassword,
      })).subscribe({
        complete: () => {
          this.activeForm.emit('login');
        }
      })
    }
  }

  get newPassword(){
    return this.form.get('newPassword')
  }

  get confirmPassword(){
    return this.form.get('confirmPassword')
  }
}
