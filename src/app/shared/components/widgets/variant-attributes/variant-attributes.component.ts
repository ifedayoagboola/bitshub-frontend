import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { Product, SelectedVariant, Variation } from '../../../interface/product.interface';
import { Attribute, AttributeValue } from '../../../interface/attribute.interface';
import { CommonModule } from '@angular/common';
import { Cart } from '../../../interface/cart.interface';
import { CurrencySymbolPipe } from '../../../pipe/currency.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { Attachment } from '../../../interface/attachment.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SizeChartModalComponent } from '../modal/size-chart-modal/size-chart-modal.component';
import { ButtonComponent } from '../button/button.component';
import { Select, Store } from '@ngxs/store';
import { CartState } from '../../../store/state/cart.state';
import { Observable } from 'rxjs';
import { CarouselComponent } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-variant-attributes',
    imports: [CommonModule, CurrencySymbolPipe, TranslateModule,
        ButtonComponent],
    templateUrl: './variant-attributes.component.html',
    styleUrl: './variant-attributes.component.scss'
})
export class VariantAttributesComponent {

  @Input() product: Product;
  @Input() attributes: Attribute[] = [];
  @Input() isAllVariantStyleDropdown: boolean = false;
  @Input() owlCar: CarouselComponent;
  @Input() showPrice: boolean;
  @Input() showVariableType: string[] = ['color', 'rectangle', 'circle', 'radio', 'dropdown', 'image'];
  @Input() variant_hover: boolean;

  @Output() selectVariation: EventEmitter<Variation> = new EventEmitter();

  cartItem$: Observable<Cart[]> = inject(Store).select(CartState.cartItems);

  public cartItem: Cart | null;
  public productQty: number = 1;
  public attributeValues: number[] = [];
  public variantIds: number[] = [];
  public hoverVariantIds: number[] = [];
  public soldOutAttributesIds: number[] = [];
  public hoverSoldOutAttributesIds: number[] = [];
  public selectedOptions: SelectedVariant[] = [];
  public selectedVariation: Variation | null;
  public hoverVariation: Variation | null;
  public break: boolean = false;

  constructor(private modal: NgbModal){}

  ngOnChanges(changes: SimpleChanges) {
    setTimeout(() => {
      if(changes['product'] && changes['product'].currentValue) {
        this.product = changes['product']?.currentValue;
      }

      if(changes['attributes'] && changes['attributes'].currentValue) {
        this.attributes = changes['attributes']?.currentValue;
      }

      this.cartItem$.subscribe(items => {
        this.cartItem = items.find(item => item.product.id == this.product.id)!;
      });

      this.checkVariantAvailability(this.product);
    }, 0);

    if(changes['showPrice']?.currentValue){
      this.product.attributes.forEach(attribute => {
        attribute.attribute_values.forEach(value => {
          this.product.variations.forEach(variation => {
            variation.attribute_values.forEach(att => {
              if (att.id !== value.id)
                value['price'] = variation.price;
                value['sale_price'] = variation.sale_price;
            });
          });
        });
      });
    }
  }

  checkVariantAvailability(product: Product) {
    this.selectedOptions = [];
    this.attributeValues = [];
    this.selectedVariation = null;
    this.hoverVariation = null;
    this.hoverSoldOutAttributesIds = [];

    product?.variations?.forEach(variation => {
      variation?.attribute_values?.filter(attribute_value => {
        if(this.attributeValues.indexOf(attribute_value?.id) === -1)
          this.attributeValues.push(attribute_value?.id);
      });
    });

    // Set cart variant Default
    if(this.cartItem?.variation) {
      this.cartItem?.variation.attribute_values.filter(attribute_val => {
        this.setVariant(this.product.variations, attribute_val);
      });
    }

    if(!this.cartItem) {
      // Set First variant Default
      for (const attribute of product?.attributes) {
        if (this.attributeValues?.length && attribute?.attribute_values?.length) {
          let values: number[] = [];
          for (const value of attribute.attribute_values) {

            if(values.indexOf(value.id) === -1)
              values.push(value.id);

            if (this.attributeValues.includes(value.id)) {
              this.setVariant(product.variations, value);
              if(this.break)
                break; // Break out of the inner loop after setting the first variant
            }

          }
        }
      }
    }

    // Set Variation Image
    product.variations?.forEach(variation => {
      let attrValues = variation?.attribute_values?.map(attribute_value => attribute_value?.id);
      product?.attributes.filter(attribute => {
        if((attribute.style == 'image') || (attribute.style == 'image_price')) {
          attribute.attribute_values.filter(attribute_value => {
            if(this.attributeValues.includes(attribute_value.id)) {
              if(attrValues.includes(attribute_value.id)) {
                attribute_value.variation_image = variation.variation_image;
                attribute_value.name = variation.name;
                attribute_value.price = variation.price;
                attribute_value.sale_price = variation.sale_price;
              }
            }
          });
        }
      });
    });
  }

  setVariant(variations: Variation[], value: AttributeValue, event?: string) {
    const index = this.selectedOptions.findIndex(item => Number(item.attribute_id) === Number(value?.attribute_id));
    this.soldOutAttributesIds = [];
    if(index === -1) {
      this.selectedOptions.push({id: Number(value?.id), attribute_id: Number(value?.attribute_id)});
    } else {
      this.selectedOptions[index].id = value?.id;
    }
    variations?.forEach(variation => {
      let attrValues = variation?.attribute_values?.map(attribute_value => attribute_value?.id);
      this.variantIds = this.selectedOptions?.map(variants => variants?.id);
      let doValuesMatch = attrValues.length === this.selectedOptions.length &&
      attrValues.every(value => this.variantIds.includes(value));
      if(doValuesMatch) {
        this.selectedVariation = variation;
        this.product['quantity'] = this.selectedVariation ? this.selectedVariation?.quantity : this.product?.quantity;
        this.product['sku'] = this.selectedVariation ? this.selectedVariation?.sku : this.product?.sku;
        this.product['sale_price'] = this.selectedVariation ? this.selectedVariation?.sale_price : this.product?.sale_price;
        if(this.owlCar && this.selectedVariation.variation_image) {
          this.owlCar.to(this.selectedVariation.variation_image.id.toString());
        }
      }

      if(variation.stock_status == 'out_of_stock' || (!variation.status || !this.product.status)) {
        variation?.attribute_values.filter(attr_value =>  {
          if(attrValues.some(value => this.variantIds.includes(value))) {
            if(attrValues.every(value => this.variantIds.includes(value))){
              this.soldOutAttributesIds.push(attr_value.id);
            } else if(!this.variantIds.includes(attr_value.id)) {
              this.soldOutAttributesIds.push(attr_value.id);
            }
          } else if(attrValues.length == 1 && attrValues.includes(attr_value.id)) {
            this.soldOutAttributesIds.push(attr_value.id);
          }
        });
      }
    });

    // Set Attribute Value
    this.product?.attributes.filter(attribute => {
      attribute.attribute_values.filter(a_value => {
        if(a_value.id == value.id) {
          attribute.selected_value = a_value.value;
        }
      })
    });

    if(this.selectedVariation && this.selectedVariation?.status
      && this.selectedVariation.stock_status == 'in_stock') {
      this.break = true;
    } else {
      this.break = false;
    }

    if(event !== 'hover'){
      this.hoverVariantIds = this.variantIds;
      this.hoverVariation = this.selectedVariation;
      this.hoverSoldOutAttributesIds = this.soldOutAttributesIds;
    }

    if(this.selectedVariation){
       this.selectVariation.emit(this.selectedVariation);
    }
  }

  removeVariation(){
    this.variantIds = this.hoverVariantIds;
    this.selectedVariation = this.hoverVariation;
    this.soldOutAttributesIds = this.hoverSoldOutAttributesIds;

    if(this.selectedVariation){
      if(this.owlCar && this.selectedVariation.variation_image) {
        this.owlCar.to(this.selectedVariation.variation_image.id.toString());
      }
      this.selectVariation.emit(this.selectedVariation);
   }
  }

  openSizeChartModal(image: Attachment){
    const sizeChart = this.modal.open(SizeChartModalComponent, { size: 'lg', centered: true });
    sizeChart.componentInstance.image = image;
  }
}
