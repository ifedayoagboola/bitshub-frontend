import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../../../../../../environments/environment';
import { ButtonComponent } from '../../../../../../shared/components/widgets/button/button.component';
import { Product } from '../../../../../../shared/interface/product.interface';
import { Option } from '../../../../../../shared/interface/theme-option.interface';

@Component({
    selector: 'app-product-social-share',
    imports: [CommonModule, TranslateModule, ButtonComponent, FormsModule, ReactiveFormsModule],
    templateUrl: './product-social-share.component.html',
    styleUrl: './product-social-share.component.scss'
})
export class ProductSocialShareComponent {

  @Input() product: Product;
  @Input() option: Option | null;

  public url: string = environment.baseURL;
  public shareText: string = ''
  public isBrowser: boolean;

  constructor(public modalService: NgbModal, @Inject(PLATFORM_ID) platformId: object){
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if(this.product){
      this.shareOnFacebook(this.product.slug)
    }
  }
  ngOnChanges() {
  }

  shareOnFacebook(slug: string) {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.url+'/product/'+slug)}`;
    this.shareText = facebookShareUrl;
  }

  shareOnTwitter(slug: string) {
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(this.url+'/product/'+slug)}`;
    this.shareText = twitterShareUrl;
  }

  shareOnLinkedIn(slug: string) {
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(this.url+'/product/'+slug)}`;
    this.shareText = linkedInShareUrl;
  }

  shareOnWhatsApp(slug: string) {
    const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(this.url+'/product/'+slug)}`;
    this.shareText = whatsappShareUrl;
  }

  shareViaEmail(slug: string) {
    const subject = 'Check out this awesome product!';
    const body = `I thought you might be interested in this product: ${this.url+'/product/'+slug}`;
    const emailShareUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if(this.isBrowser) {
      window.location.href = emailShareUrl; // Use location.href to open the default email client
    }
  }

  copyLink(){
    navigator.clipboard.writeText(this.shareText);
  }
}
