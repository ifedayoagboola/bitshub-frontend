import { Component, inject, Input } from '@angular/core';
import { Params } from '../../../../../../shared/interface/core.interface';
import { Select, Store } from '@ngxs/store';
import { BrandState } from '../../../../../../shared/store/state/brand.state';
import { Observable } from 'rxjs';
import { Brands } from '../../../../../../shared/interface/theme.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { GetBrands } from '../../../../../../shared/store/action/brand.action';
import { Brand, BrandModel } from '../../../../../../shared/interface/brand.interface';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SearchFilterPipe } from '../../../../../../shared/pipe/search-filter.pipe';
import { NoDataComponent } from '../../../../../../shared/components/widgets/no-data/no-data.component';

@Component({
    selector: 'app-collection-brand-filter',
    imports: [CommonModule, TranslateModule, FormsModule, SearchFilterPipe, NoDataComponent],
    templateUrl: './collection-brand-filter.component.html',
    styleUrl: './collection-brand-filter.component.scss'
})
export class CollectionBrandFilterComponent {

 brand$: Observable<BrandModel> = inject(Store).select(BrandState.brand);

  @Input() filter: Params;

  public brands: Brand[];
  public selectedBrands: string[] = [];
  public searchText: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store){}

    ngOnInit(){
      this.store.dispatch(new GetBrands({status: 1}))
      this.brand$.subscribe((brand) => {
        this.brands = brand.data;
      })
    }

  ngOnChanges() {
    this.selectedBrands = this.filter['brand'] ? this.filter['brand'].split(',') : [];
  }

  applyFilter(event: Event) {
    const index = this.selectedBrands.indexOf((<HTMLInputElement>event?.target)?.value);  // checked and unchecked value

    if ((<HTMLInputElement>event?.target)?.checked)
      this.selectedBrands.push((<HTMLInputElement>event?.target)?.value); // push in array cheked value
    else
      this.selectedBrands.splice(index,1);  // removed in array unchecked value

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        brand: this.selectedBrands.length ? this.selectedBrands?.join(",") : null,
        page: 1
      },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    });
  }

  // check if the item are selected
  checked(item: string){
    if(this.selectedBrands?.indexOf(item) != -1){
      return true;
    }
    return false;
  }
}
