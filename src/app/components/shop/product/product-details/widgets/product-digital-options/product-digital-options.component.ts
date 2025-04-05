import { Component, Input } from '@angular/core';
import { Product } from '../../../../../../shared/interface/product.interface';
import { VideoModalComponent } from '../../../../../../shared/components/widgets/modal/video-modal/video-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-product-digital-options',
    imports: [TranslateModule],
    templateUrl: './product-digital-options.component.html',
    styleUrl: './product-digital-options.component.scss'
})
export class ProductDigitalOptionsComponent {

  @Input() product: Product;

  constructor(private modal: NgbModal){}

  openModal(url: string, type: string){
    const modal = this.modal.open(VideoModalComponent, { centered: true, size: 'lg',windowClass: 'theme-modal-2' });
    modal.componentInstance.video_url = url;
    modal.componentInstance.type = type;
  }
  
}
