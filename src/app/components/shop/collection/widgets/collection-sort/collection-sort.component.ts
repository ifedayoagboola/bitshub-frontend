import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, HostListener, Inject, Input, Output, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Select2Data, Select2Module, Select2UpdateEvent } from 'ng-select2-component';
import { Params } from '../../../../../shared/interface/core.interface';
import { AttributeService } from '../../../../../shared/services/attribute.service';
import { PaginationService } from '../../../../../shared/services/pagination.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
    selector: 'app-collection-sort',
    imports: [CommonModule, Select2Module, TranslateModule, SidebarComponent],
    templateUrl: './collection-sort.component.html',
    styleUrl: './collection-sort.component.scss'
})
export class CollectionSortComponent {

  @Input() filter: Params;
  @Input() products?: number
  @Input() topFilter: boolean;
  @Input() sidebarPopup: boolean;
  @Input() gridCol: string;

  @Output() setGridClass: EventEmitter<{ class: string, list_view: boolean }> = new EventEmitter();

  public sorting: Select2Data = [
    {
      value: 'asc',
      label: 'Ascending Order',
    },
    {
      value: 'desc',
      label: 'Descending Order',
    },
    {
      value: 'low-high',
      label: 'Low - High Price',
    },
    {
      value: 'high-low',
      label: 'High - Low Price',
    },
    {
      value: 'a-z',
      label: 'A - Z Order',
    },
    {
      value: 'z-a',
      label: 'Z - A Order',
    },
    {
      value: 'discount-high-low',
      label: '% Off - Hight To Low',
    }];

    public sortingItem: Select2Data = [
    {
      value: '10',
      label: '10 Products',
    },
    {
      value: '25',
      label: '25 Products',
    },
    {
      value: '50',
      label: '50 Products',
    },
    {
      value: '100',
      label: '100 Products',
    }
  ];

  public isFilter: boolean = false;
  public popupSidebar: boolean = false;
  public listView: boolean = false;
  public class: string = "col-xl-3 col-6";
  public width: number;
  public selectedGrid: string = 'collection_3_grid';
  public gridArray = ['collection_2_grid','collection_3_grid', 'collection_4_grid', 'collection_list_view'];
  public isBrowser: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public attributeService: AttributeService,
    @Inject(PLATFORM_ID) private platformId: Object,
    public paginationService: PaginationService) {
    this.setGridClass.emit({ class: this.class, list_view: this.listView });
      this.isBrowser = isPlatformBrowser(this.platformId);
      if(this.isBrowser)
        this.width = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: number; }; }) {
   this.width = event.target.innerWidth;
  }

  ngOnChanges(changes: SimpleChanges) {
    let layout = changes['filter']?.currentValue.layout;
    if(this.gridCol){
      this.grid(this.gridCol)
    }else {
      if(this.gridArray.includes(layout)){
        if(layout){
          this.selectedGrid = layout
          this.grid(layout);
        }
      }else if(layout == 'collection_no_sidebar' || layout == 'collection_top_filter' || layout == 'collection_sidebar_popup'){
        this.grid('collection_4_grid')
      }else{
        this.grid(this.selectedGrid)
      }
    }
  }

  grid(value: string){
    if(value == "collection_2_grid"){
      this.class = "col-6";
      this.listView = false;
    }else if(value == "collection_3_grid"){
      this.class = "col-lg-4 col-6";
      this.listView = false;
    }else if(value == "collection_4_grid"){
      this.class = "col-xl-3 col-6";
      this.listView = false;
    }else if(value == "collection_grid_view"){
      this.class = "col-xxl-3 col-md-4 col-6";
      this.listView = false;
    }else if(value == "collection_list_view"){
      this.class = "col-sm-12 col-6";
      this.listView = true;
    }

    if(value){
      this.selectedGrid = value;
    }
    this.setGridClass.emit({ class: this.class, list_view: this.listView });
  }

    // SortBy Filter
  sortByFilter(data: Select2UpdateEvent) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        sortBy: data && data.value ? data.value : null,
        field: data && (data.value == 'asc' || data.value == 'desc') ? 'created_at' : null
      },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    });
  }

  sortProductsLength(data: Select2UpdateEvent){
    this.filter['paginate'] = data.value ? data.value : this.filter['paginate'];
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
       paginate: data.value
      },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    });
  }

  openOffCanvasFilter(value: boolean){
    this.attributeService.offCanvasMenu = value;
  }

  openFilter(){
    this.isFilter =! this.isFilter;
     if(this.isBrowser) {
       if(window.innerWidth < 992){
         this.attributeService.offCanvasMenu = true;
       }
     }
  }
}
