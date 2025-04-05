import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../../../../environments/environment';
import { Option } from '../../../../shared/interface/theme-option.interface';
import { FooterOneComponent } from '../footer-one/footer-one.component';

@Component({
    selector: 'app-footer-four',
    imports: [CommonModule, TranslateModule, FooterOneComponent],
    templateUrl: './footer-four.component.html',
    styleUrl: './footer-four.component.scss'
})
export class FooterFourComponent {

  @Input() data: Option | null;
  @Input() logo: string | undefined;

  public StorageURL = environment.storageURL;

  public active: { [key: string]: boolean } = {
    categories: false,
    useful_link: false,
    help_center: false
  };

  toggle(value: string){
    this.active[value] = !this.active[value];
  }
}
