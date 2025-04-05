import {  Component, Input } from '@angular/core';
import { Params } from '../../../../../../shared/interface/core.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Attribute } from '../../../../../../shared/interface/attribute.interface';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-collection-attribute-filter',
    imports: [CommonModule],
    templateUrl: './collection-attribute-filter.component.html',
    styleUrl: './collection-attribute-filter.component.scss'
})
export class CollectionAttributeFilterComponent {

  @Input() attribute: Attribute;
  @Input() filter: Params;

  public selectedAttributes: string[] = [];

  constructor(private route: ActivatedRoute,
    private router: Router){
  }

  ngOnChanges() {
    this.selectedAttributes = this.filter['attribute'] ? this.filter['attribute'].split(',') : [];
  }

  applyFilter(event: Event) {
    const index = this.selectedAttributes.indexOf((<HTMLInputElement>event?.target)?.value);  // checked and unchecked value

    if ((<HTMLInputElement>event?.target)?.checked)
      this.selectedAttributes.push((<HTMLInputElement>event?.target)?.value); // push in array cheked value
    else
      this.selectedAttributes.splice(index,1);  // removed in array unchecked value

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        attribute: this.selectedAttributes.length ? this.selectedAttributes?.join(",") : null,
        page: 1
      },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    });
  }

  // check if the item are selected
  checked(item: string){
    if(this.selectedAttributes?.indexOf(item) != -1){
      return true;
    }
    return false;
  }

}
