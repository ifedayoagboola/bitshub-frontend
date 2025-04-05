import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { result } from '../../product-box-two/product-box-two.component';
import { Product, Variant, Variation } from '../../../../../interface/product.interface';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-dropdown-variant',
    imports: [CommonModule, TranslateModule],
    templateUrl: './dropdown-variant.component.html',
    styleUrl: './dropdown-variant.component.scss'
})
export class DropdownVariantComponent {

  @Input() product: Product;
  @Output() selectedOption: EventEmitter<Variation> = new EventEmitter();

  public result:result[] = [];
  public soldOutAttributesIds: number[] = [];
  public selectedVariation: Variation;

  constructor(private ref: ChangeDetectorRef) {}

  ngOnChanges(){
    setTimeout(() => {
      if(this.product.variations?.length){
       this.result = this.generateCombinations(this.product)
      }
    }, 1);
  }

  // Select First Attribute
  checkVariant(item: Variation, i: number){
    if(item.stock_status == 'in_stock' && item.status){
      if(item.stock_status === 'in_stock' && item.status && i === this.result.findIndex(obj => obj.value.stock_status === 'in_stock' && obj.value.status)){
        return true;
      }
    }
  }

  getSelectedVariant(item: any){
    if(item && item.target.value){
      this.selectedOption.emit(JSON.parse(item.target.value))
    }
  }

  // Combination Of Variations
  generateCombinations(attributes: Product): any {
    const selectVariations: any[] = [];

    attributes.variations.forEach(variation => {
        const labelAttributes = variation.attribute_values.map(attr => attr.value)?.join('/');
        const value = variation;

        selectVariations.push({ label: labelAttributes, value });
    });

    // Selected Variation While Page Load
    selectVariations.forEach((item,i) => {
      if(item.value.stock_status == 'in_stock' && !!item.value.status){
        if(item.value.stock_status === 'in_stock' && !!item.value.status && i === selectVariations.findIndex(obj => obj.value.stock_status === 'in_stock' && obj.value.status)){
          this.selectedVariation = item.value;
          if(this.selectedVariation){
            this.selectedOption.emit(this.selectedVariation)
          }
          return true;
        }
      }
    })

    return selectVariations;
  }
}
