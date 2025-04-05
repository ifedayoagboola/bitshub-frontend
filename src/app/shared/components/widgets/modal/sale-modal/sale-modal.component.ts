import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Select, Store } from '@ngxs/store';
import { ThemeOptionState } from '../../../../store/state/theme-option.state';
import { Observable } from 'rxjs';
import { Option } from '../../../../interface/theme-option.interface';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-sale-modal',
    imports: [CommonModule, TranslateModule],
    templateUrl: './sale-modal.component.html',
    styleUrl: './sale-modal.component.scss'
})
export class SaleModalComponent {

  @ViewChild("saleModal", { static: false }) SaleModal: TemplateRef<string>;
  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions);

  public closeResult: string;
  public modalOpen: boolean = true;

  constructor(private modalService: NgbModal){}

  async openModal() {
    localStorage.setItem("exit", 'true');
    this.modalOpen = true;
    this.modalService.open(this.SaleModal, {
      ariaLabelledBy: 'profile-Modal',
      centered: true,
      windowClass: 'theme-modal modal-lg exit-modal'
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
