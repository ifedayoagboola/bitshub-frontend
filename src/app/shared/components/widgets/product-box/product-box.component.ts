import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product } from '../../../interface/product.interface';
import { Option } from '../../../interface/theme-option.interface';
import { ThemeOptionService } from '../../../services/theme-option.service';
import { UpdateProductBox } from '../../../store/action/theme-option.action';
import { ThemeOptionState } from '../../../store/state/theme-option.state';
import { ProductBoxEightComponent } from './product-box-eight/product-box-eight.component';
import { ProductBoxElevenComponent } from './product-box-eleven/product-box-eleven.component';
import { ProductBoxFiveComponent } from './product-box-five/product-box-five.component';
import { ProductBoxFourComponent } from './product-box-four/product-box-four.component';
import { ProductBoxHorizontalComponent } from './product-box-horizontal/product-box-horizontal.component';
import { ProductBoxNineComponent } from './product-box-nine/product-box-nine.component';
import { ProductBoxOneComponent } from './product-box-one/product-box-one.component';
import { ProductBoxSevenComponent } from './product-box-seven/product-box-seven.component';
import { ProductBoxSixComponent } from './product-box-six/product-box-six.component';
import { ProductBoxTenComponent } from './product-box-ten/product-box-ten.component';
import { ProductBoxThreeComponent } from './product-box-three/product-box-three.component';
import { ProductBoxTwelveComponent } from './product-box-twelve/product-box-twelve.component';
import { ProductBoxTwoComponent } from "./product-box-two/product-box-two.component";
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-product-box',
    templateUrl: './product-box.component.html',
    styleUrl: './product-box.component.scss',
    imports: [CommonModule, ProductBoxOneComponent, ProductBoxHorizontalComponent,
        ProductBoxTwoComponent, ProductBoxThreeComponent, ProductBoxFourComponent,
        ProductBoxFiveComponent, ProductBoxSixComponent, ProductBoxSevenComponent,
        ProductBoxEightComponent, ProductBoxNineComponent, ProductBoxTenComponent,
        ProductBoxElevenComponent, ProductBoxTwelveComponent]
})
export class ProductBoxComponent {

  @Input() product: Product;
  @Input() style: string;
  @Input() product_box_style: string;

  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions);
  productBox$: Observable<string> = inject(Store).select(ThemeOptionState.productBox);

  public path: string;
  public variant: string;


  constructor(public route: ActivatedRoute, private store: Store, public themeOptionService: ThemeOptionService, private cdRef: ChangeDetectorRef) {
    this.route.queryParams.subscribe(params => this.path = params['theme'])
  }
  
  ngOnInit() {
    this.setVariant();
    this.productBox$.subscribe(res => {
      setTimeout(() => {
        this.variant = res;
      },500)
  })  
}

  setVariant(){
      if(this.path == 'fashion_one' || this.path == 'fashion_two' || this.path == 'fashion_three' || this.path == 'furniture_two' || this.path == 'watch' || this.path == 'christmas' || this.path == 'single_product'){
        this.variant = 'product_box_one';
      }else if(this.path == 'fashion_four' || this.path == 'fashion_seven' || this.path == 'tools'){
        this.variant = 'product_box_two'
      }else if(this.path == 'bicycle' || this.path == 'surfboard'){
        this.variant = 'product_box_three';
      }else if(this.path == 'medical' || this.path == 'fashion_six'){
        this.variant = 'product_box_four';
      }else if(this.path == 'perfume' || this.path == 'furniture_dark' || this.path == 'furniture_one' || this.path == 'shoes'){
        this.variant = 'product_box_five';
      }else if(this.path == 'bag' || this.path == 'electronics_one' || this.path == 'electronics_two' || this.path == 'electronics_three' || this.path == 'fashion_five'){
        this.variant = 'product_box_six';
      }else if(this.path == 'marketplace_one' || this.path == 'marketplace_two' || this.path == 'marketplace_three' || this.path == 'marketplace_four'){
        this.variant = 'product_box_seven';
      }else if(this.path == 'gym' || this.path == 'vegetables_one' || this.path == 'vegetables_two' || this.path == 'vegetables_four'){
        this.variant = 'product_box_eight';
      }else if(this.path == 'marijuana' || this.path == 'jewellery_three' || this.path == 'goggles'){
        this.variant = 'product_box_nine';
      }else if(this.path == 'digital_download'){
        this.variant = 'product_box_ten';
      }
      // else if(''){
      //   this.variant = 'product_box_eleven';
      // }
      else if(this.path == 'shoes'){
        this.variant = 'product_box_fourteen';
      }else if(this.path == 'jewellery_one' || this.path == 'jewellery_two'){
        this.variant = 'product_box_twelve';
      }else{
        this.themeOption$.subscribe(theme => {
          this.variant = theme?.product ? theme?.product?.product_box_variant : 'product_box_one';
        });
      }
      this.store.dispatch(new UpdateProductBox(this.variant));
      this.cdRef.detectChanges(); 
    }

    ngAfterViewInit() {
      this.setVariant();
      this.cdRef.detectChanges();
    }
  }
