import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FooterLogoComponent } from '../widgets/footer-logo/footer-logo.component';
import { FooterAboutComponent } from '../widgets/footer-about/footer-about.component';
import { FooterSocialLinksComponent } from '../widgets/footer-social-links/footer-social-links.component';
import { FooterCategoriesComponent } from '../widgets/footer-categories/footer-categories.component';
import { FooterPaymentOptionsComponent } from '../widgets/footer-payment-options/footer-payment-options.component';
import { FooterCopyrightComponent } from '../widgets/footer-copyright/footer-copyright.component';
import { FooterLinksComponent } from '../widgets/footer-links/footer-links.component';
import { FooterContactComponent } from '../widgets/footer-contact/footer-contact.component';
import { FooterNewsLetterComponent } from '../widgets/footer-news-letter/footer-news-letter.component';
import { ThemeOptionService } from '../../../services/theme-option.service';
import { TranslateModule } from '@ngx-translate/core';
import { Option } from '../../../../shared/interface/theme-option.interface';
import { NoDataComponent } from '../../widgets/no-data/no-data.component';

@Component({
    selector: 'app-footer-one',
    imports: [CommonModule, TranslateModule, FooterLogoComponent, FooterAboutComponent,
        FooterSocialLinksComponent, FooterCategoriesComponent, FooterLinksComponent,
        FooterContactComponent, FooterCopyrightComponent,
        FooterPaymentOptionsComponent, FooterNewsLetterComponent, NoDataComponent],
    templateUrl: './footer-one.component.html',
    styleUrl: './footer-one.component.scss'
})
export class FooterOneComponent {

  @Input() data: Option | null;
  @Input() logo: string | undefined;

  public active: { [key: string]: boolean } = {
    categories: false,
    useful_link: false
  };

  constructor(private themeOptionService: ThemeOptionService){}

  @ViewChild('description', {static: false}) descriptionElement: ElementRef;

 ngAfterViewInit() {
 // Use a timeout to ensure that the element is rendered before trying to access its height
 setTimeout(() => {
    const description = this.descriptionElement?.nativeElement;
    this.themeOptionService.footer_height = description?.offsetHeight
    }, 0);
  }

  toggle(value: string){
    this.active[value] = !this.active[value];
  }
}
