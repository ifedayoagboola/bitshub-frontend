import { Component, Input } from '@angular/core';
import { Video } from '../../../shared/interface/theme.interface';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-video',
    templateUrl: './video.component.html',
    styleUrl: './video.component.scss'
})
export class VideoComponent {

  @Input() data?: Video;
  @Input() slug?: string;

  public StorageURL = environment.storageURL;

}
