import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FooterLogoComponent } from '../widgets/footer-logo/footer-logo.component';
import { FooterAboutComponent } from '../widgets/footer-about/footer-about.component';
import { FooterContactComponent } from '../widgets/footer-contact/footer-contact.component';
import { FooterCategoriesComponent } from '../widgets/footer-categories/footer-categories.component';
import { FooterLinksComponent } from '../widgets/footer-links/footer-links.component';
import { FooterCopyrightComponent } from '../widgets/footer-copyright/footer-copyright.component';
import { FooterPaymentOptionsComponent } from '../widgets/footer-payment-options/footer-payment-options.component';
import { TranslateModule } from '@ngx-translate/core';
import { Option } from '../../../../shared/interface/theme-option.interface';
import { FooterNewsLetterComponent } from '../widgets/footer-news-letter/footer-news-letter.component';
import { NoDataComponent } from '../../widgets/no-data/no-data.component';
 
@Component({
    selector: 'app-footer-two',
    imports: [CommonModule, TranslateModule, FooterLogoComponent, FooterAboutComponent,
        FooterContactComponent, FooterCategoriesComponent, FooterLinksComponent,
        FooterCopyrightComponent, FooterPaymentOptionsComponent, FooterNewsLetterComponent, NoDataComponent],
    templateUrl: './footer-two.component.html',
    styleUrl: './footer-two.component.scss'
})
export class FooterTwoComponent {

  @Input() data: Option | null;
  @Input() logo: string | undefined;

  public active: { [key: string]: boolean } = {
    categories: false,
    useful_link: false,
    help_center: false
  };

  toggle(value: string){
    this.active[value] = !this.active[value];
  }
}
