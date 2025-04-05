import { Component, inject, Inject, PLATFORM_ID, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Option } from '../../../../interface/theme-option.interface';
import { Subscription } from '../../../../store/action/subscription.action';
import { UpdateSession } from '../../../../store/action/theme-option.action';
import { ThemeOptionState } from '../../../../store/state/theme-option.state';
import { ButtonComponent } from '../../button/button.component';
import { ThemeOptionService } from '../../../../services/theme-option.service';
import { environment } from '../../../../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-newsletter-modal',
    imports: [TranslateModule, FormsModule, ReactiveFormsModule,
        ButtonComponent],
    templateUrl: './newsletter-modal.component.html',
    styleUrl: './newsletter-modal.component.scss'
})
export class NewsletterModalComponent {

  newsletter$: Observable<boolean> = inject(Store).select(ThemeOptionState.newsletter);
  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions);

  @ViewChild("newsletterModal", { static: true }) NewsletterModal: TemplateRef<string>;

  public newsletter: boolean;
  public themeOption: Option;

  public closeResult: string;
  public modalOpen: boolean = true;
  public newsLetterForm: FormGroup;
  public isSubmit: boolean = false;
  public storageURL = environment.storageURL

  constructor( private store: Store,
               private modalService: NgbModal,
               public themeOptionService: ThemeOptionService,
               @Inject(PLATFORM_ID) private platformId: Object,
               public formBuilder: FormBuilder ){
    this.newsletter$.subscribe(res => this.newsletter = res);

    this.newsLetterForm = this.formBuilder.group({
        email: new FormControl('', [Validators.required, Validators.email]),
      })

    if(this.newsletter){
      themeOptionService.newsletterModal = true;
    }else{
      themeOptionService.newsletterModal = false;
    }
    this.themeOption$.subscribe(res => this.themeOption = res);
  }

  ngAfterViewInit(): void {
    if(this.newsletter === true){
      setTimeout(() => {
      this.openModal()
      }, 3000);
      this.store.dispatch(new UpdateSession('newsletter', false));
    }
  }

  async openModal() {
    this.modalOpen = true;
    if (isPlatformBrowser(this.platformId)) {
      this.modalService.open(this.NewsletterModal, {
        ariaLabelledBy: 'profile-Modal',
        centered: true,
        windowClass: 'modal-xl modal-dialog-centered auth-modal theme-modal-2'
      }).result.then((result) => {
        `Result ${result}`
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }

  private getDismissReason(reason: ModalDismissReasons): string {
    if (reason === ModalDismissReasons.ESC) {
    this.themeOptionService.newsletterModal = false;
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    this.themeOptionService.newsletterModal = false;
      return 'by clicking on a backdrop';
    } else {
      this.themeOptionService.newsletterModal = false;
      return `with: ${reason}`;
    }
  }

  submit(){
    this.isSubmit = true;
    this.newsLetterForm.markAllAsTouched();
    if(this.newsLetterForm.valid){
      this.store.dispatch(new Subscription(this.newsLetterForm.value!))
      this.newsLetterForm.reset();
      this.isSubmit = false;
    }
  }

  closeModal(){
    this.themeOptionService.newsletterModal = false;
    this.modalService.dismissAll();
  }
}
