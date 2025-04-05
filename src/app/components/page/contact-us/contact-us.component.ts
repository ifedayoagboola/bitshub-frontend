import { Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ThemeOptionState } from '../../../shared/store/state/theme-option.state';
import { Observable } from 'rxjs';
import { breadcrumb } from '../../../shared/interface/breadcrumb.interface';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Option, Contact } from '../../../shared/interface/theme-option.interface';
import { ContactUs } from '../../../shared/store/action/page.action';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-contact-us',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule,
        BreadcrumbComponent, ButtonComponent],
    templateUrl: './contact-us.component.html',
    styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {

  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;

  public breadcrumb: breadcrumb = {
    title: "Contact",
    items: [{ label: 'Contact', active: true }]
  }

  public form: FormGroup;
  public contactData: Contact;

  constructor(private formBuilder: FormBuilder,
    private store: Store){
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required]),
    })

    this.themeOption$.subscribe(data => this.contactData = data?.contact_us)
  }

  submit(){
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.store.dispatch(new ContactUs(this.form.value)).subscribe({
        complete: ()=>{
          this.form.reset();
        }
      })
    }
  }
}
