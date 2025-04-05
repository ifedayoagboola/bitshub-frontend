import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { AlertComponent } from '../../../shared/components/widgets/alert/alert.component';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';
import { AuthNumberLoginState } from '../../../shared/interface/auth.interface';
import { breadcrumb } from '../../../shared/interface/breadcrumb.interface';
import { NotificationService } from '../../../shared/services/notification.service';
import { VerifyNumberOTP, VerifyOTP } from '../../../shared/store/action/auth.action';

@Component({
    selector: 'app-otp',
    imports: [CommonModule, FormsModule, ReactiveFormsModule,
        TranslateModule, AlertComponent, ButtonComponent],
    templateUrl: './otp.component.html',
    styleUrl: './otp.component.scss'
})
export class OtpComponent {

  @Output() activeForm: EventEmitter<string> = new EventEmitter();
  @Input() type: string;

  public form: FormGroup;
  public validate: boolean = false;
  public email: string;
  public number: AuthNumberLoginState;
  public breadcrumb: breadcrumb = {
    title: "OTP",
    items: [
      {
        label: "OTP",
        active: true
      }
    ]
  }

  constructor(private store: Store, public formBuilder: FormBuilder,
    private notificationService: NotificationService){
    this.form = this.formBuilder.group({
      otp: ["", [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnInit(){
    if(this.type === 'email'){
      this.email = this.store.selectSnapshot(state => state.auth.email);
      if(!this.email){
        this.activeForm.emit('login');
      }
    } else if(this.type === 'number'){
      this.number = this.store.selectSnapshot(state => state.auth.number);
      if(!this.number.phone){
        this.activeForm.emit('login');
      }
    } else {
      this.activeForm.emit('login');
    }
  }

  submit(){
    this.form.markAllAsTouched();
    if(this.form.valid){
      var action: any;
      var value;
      if(this.type === 'email') {
        value = {
          email: this.email,
          token: this.form.value.otp
        }
        action = new VerifyOTP(value)
      }

      if(this.type === 'number') {
        value = {
          phone: this.number.phone,
          country_code: this.number.country_code,
          token: this.form.value.otp
        }
        action = new VerifyNumberOTP(value)
      }

      this.store.dispatch(action).subscribe({
        complete: () => {
          if(this.type === 'email'){
            this.activeForm.emit('updatePassword');
          } else{
            this.notificationService.showSuccess('Login Successfully.');
          }
        }
      })
    }
  }
  get otp(){
    return this.form.get('otp');
  }

  backForm(){
    this.activeForm.emit('email');
  }
}
