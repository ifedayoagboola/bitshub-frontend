import { Component, Input } from '@angular/core';
import { Attachment } from '../../../../interface/attachment.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../button/button.component';

@Component({
    selector: 'app-size-chart-modal',
    imports: [CommonModule, TranslateModule, ButtonComponent],
    templateUrl: './size-chart-modal.component.html',
    styleUrl: './size-chart-modal.component.scss'
})
export class SizeChartModalComponent {

  @Input() image: Attachment;

  constructor(public modal: NgbActiveModal){}

}
