import { Component, HostListener, inject, TemplateRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeOptionState } from '../../../../store/state/theme-option.state';
import { Select, Store } from '@ngxs/store';
import { Option } from '../../../../interface/theme-option.interface';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateSession } from '../../../../store/action/theme-option.action';
import { ButtonComponent } from '../../button/button.component';
import { environment } from './../../../../../../environments/environment';

@Component({
    selector: 'app-exit-modal',
    imports: [ButtonComponent],
    templateUrl: './exit-modal.component.html',
    styleUrl: './exit-modal.component.scss'
})
export class ExitModalComponent {
  @ViewChild("exitModal", { static: true }) ExitModal: TemplateRef<string>;

  exit$: Observable<boolean> = inject(Store).select(ThemeOptionState.exit);
  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions);

  public closeResult: string;
  public modalOpen: boolean = true;
  public isTabInFocus = true;
  public exit: boolean;
  public themeOption: Option;
  public storageURL = environment.storageURL

  constructor(private modalService: NgbModal, private store: Store){
    this.exit$.subscribe(res => this.exit = res);
    this.themeOption$.subscribe(res => this.themeOption = res);
  }

  @HostListener('window:mouseout', ['$event'])
  onMouseOut(event: MouseEvent) {
    if (event.clientY <= 0) {
      if(this.exit === true){
        this.openModal();
        this.store.dispatch(new UpdateSession('exit', false));
      }
    }
  }

  async openModal() {
    localStorage.setItem("exit", 'true');
    this.modalOpen = true;
    this.modalService.open(this.ExitModal, {
      ariaLabelledBy: 'profile-Modal',
      centered: true,
      windowClass: 'modal-dialog-centered auth-modal exit-modal'
    }).result.then((result) => {
      `Result ${result}`
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: ModalDismissReasons): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
