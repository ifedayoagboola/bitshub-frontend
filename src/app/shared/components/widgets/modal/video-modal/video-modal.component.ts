import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ButtonComponent } from '../../button/button.component';
import { environment } from '../../../../../../environments/environment';

@Component({
    selector: 'app-video-modal',
    imports: [ButtonComponent],
    templateUrl: './video-modal.component.html',
    styleUrl: './video-modal.component.scss'
})
export class VideoModalComponent {

  @Input() video_url: string;
  @Input() type: string;

  public StorageURL = environment.storageURL;
  
  constructor(public modal: NgbActiveModal){}

}

