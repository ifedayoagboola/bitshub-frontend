import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, inject, Input, PLATFORM_ID, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { debounceTime, distinctUntilChanged, interval, Observable, Subscription } from 'rxjs';
import { ClickOutsideDirective } from '../../../../directive/outside.directive';
import { Category, CategoryModel } from '../../../../interface/category.interface';
import { Product } from '../../../../interface/product.interface';
import { MenuService } from '../../../../services/menu.service';
import { GetSearchByCategory } from '../../../../store/action/category.action';
import { GetProductBySearchList } from '../../../../store/action/product.action';
import { CategoryState } from '../../../../store/state/category.state';
import { ProductState } from '../../../../store/state/product.state';
import { SearchModalComponent } from '../../../widgets/modal/search-modal/search-modal.component';
import { SearchDropdownComponent } from './search-dropdown/search-dropdown.component';

@Component({
    selector: 'app-search',
    imports: [CommonModule, TranslateModule, FormsModule, ReactiveFormsModule,
        SearchDropdownComponent, ClickOutsideDirective],
    templateUrl: './search.component.html',
    styleUrl: './search.component.scss'
})
export class SearchComponent {

  @Input() style: string;

  public isOpen: boolean = false;

  @ViewChild('resultsContainer') resultsContainer: ElementRef;

  productBySearch$: Observable<Product[]> = inject(Store).select(ProductState.productBySearchList);
  category$: Observable<CategoryModel> = inject(Store).select(CategoryState.category);
  searchCategory$: Observable<Category[]> = inject(Store).select(CategoryState.searchByCategory);

  public term = new FormControl();
  public searchText: string = '';
  public selectedCategory = new FormControl('');
  public show: boolean = false;
  public isOpenResult = false
  public product: Product[];
  public filteredResults: Product[] = [];
  public filteredCategory: Category[] = [];
  public selectedResultIndex = -1;
  public categories: Category[];
  public textToType = 'Search with brand and category...';
  public typedText = '';
  public animationSubscription: Subscription | undefined;
  public isBrowser: boolean;

  constructor(private route: ActivatedRoute,
    private router: Router, private store: Store,
    public menuService: MenuService,
    private modal: NgbModal,
    @Inject(PLATFORM_ID) private platformId: Object,) {
      this.isBrowser = isPlatformBrowser(platformId);
    this.category$.subscribe(res => this.categories = res.data.filter(category => category.type == 'product'));
      this.store.dispatch(new GetSearchByCategory({ status: 1, paginate: 4 }));
      this.searchCategory$.subscribe(categories => {
        this.filteredCategory = categories
      });

      this.productBySearch$.subscribe(item => this.product = item);
      this.selectedCategory.valueChanges.subscribe(data => {
        this.isOpenResult = false;
        let category = data ?  { status: 1, category_id: data } : {status: 1};
        this.store.dispatch(new GetProductBySearchList(category))
        this.store.dispatch(new GetSearchByCategory(data ?  { status: 1, ids: data } : { status: 1, paginate: 4 }))
      })
  }

  ngOnInit() {
    if(this.isBrowser && this.style == 'simple'){
      this.startTypingAnimation();
    }

    this.term.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()) // Adjust the debounce time as needed (in milliseconds)
      .subscribe((inputValue) => {
        if(inputValue.length >= 1){
          this.searchText = inputValue;
          this.filteredResults = this.filterWords(this.term.value).slice(0, 4);
          this.filteredCategory = this.searchCategory(this.searchText);
          this.selectedResultIndex = -1;
        }else if(inputValue.length == 0){
          this.onInputChange();
        }
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    let data = changes['data']?.currentValue;
    let ids  =  data?.content?.home_banner?.main_banner?.category_ids;
    if( ids && ids.length) {
      this.category$.subscribe(res => {
        this.categories = res.data.filter(category => ids?.includes(category.id))
      });
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowUp') {
      this.navigateResults(-1);
    } else if (event.key === 'ArrowDown') {
      this.navigateResults(1);
    }
  }

  openSearchModal(){
    this.modal.open(SearchModalComponent, { centered: true, size: 'xl',windowClass: 'theme-modal-2 search-modal' });
  }

  onInputChange() {
    this.filteredResults = this.product.slice(0, 4) ;
    this.filteredCategory = this.searchCategory(this.term.value);
    this.selectedResultIndex = -1;
  }

  focusInput(val:boolean){
    this.filteredResults = this.product.slice(0, 4)

    if(val) this.isOpenResult = val;
  }

  filterWords(input: string): Product[] {
    return this.product.filter(product => {
      const productName = product.name.toLowerCase();
      const inputLower = input.toLowerCase();
      const words = productName.split(' ');
      const isMatch = words.some(word => word.startsWith(inputLower));
      return isMatch
    });
  }

  selectResult(result: string) {
    this.term.patchValue(result);
    this.filteredResults = [];
    this.selectedResultIndex = -1;
  }

  searchCategory(term: string){
    let params = { status: 1, paginate: 4, search: term }
    this.store.dispatch(new GetSearchByCategory(params));
    this.searchCategory$.subscribe(categories => this.filteredCategory = categories);
    return []
  }

  navigateResults(direction: number) {
    const newIndex = this.selectedResultIndex + direction;
    if (newIndex >= 0 && newIndex < this.filteredResults.length) {
      this.selectedResultIndex = newIndex;
      this.scrollResultsContainer();
    }
  }

  private scrollResultsContainer() {
    if (this.resultsContainer && this.resultsContainer.nativeElement) {
      const container = this.resultsContainer.nativeElement;
      const selectedResultElement = this.resultsContainer.nativeElement.querySelector('.result-item.selected');

      if (selectedResultElement) {
        const containerRect = container.getBoundingClientRect();
        const selectedRect = selectedResultElement.getBoundingClientRect();

        if (selectedRect.bottom > containerRect.bottom) {
          // Scroll down
          container.scrollTop += 150;
        } else if (selectedRect.top < containerRect.top) {
          // Scroll up
          container.scrollTop -= 150;
        }
      }
    }
  }

  onEnterKey() {
    // Perform the action you want when the Enter key is pressed in the input
    if (this.selectedResultIndex !== -1) {
      const selectedItem = this.filteredResults[this.selectedResultIndex];
      this.router.navigateByUrl(`/product/${selectedItem.slug}`)
      this.isOpenResult = false;
      this.menuService.isOpenSearch = false;
      this.selectedResultIndex = 0
      this.term.patchValue('')
    }
  }

  redirectToSearch() {
    this.router.navigate(['/search'], {
      relativeTo: this.route,
      queryParams: {
        category: null,
        search: this.term.value ? this.term.value : null
      },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    });
  }

  toggleSearchBox(){
    this.show = !this.show
  }

  openSearch(){
    this.menuService.isOpenSearch = true;
    this.startTypingAnimation();
  }

  closeSearch(){
    this.menuService.isOpenSearch = false;
    this.isOpenResult = false;
  }

  startTypingAnimation() {
    const charactersArray = this.textToType.split('');
    let currentIndex = 0;
    let eraseMode = false;

    this.animationSubscription = interval(150).subscribe(() => {
      if (!eraseMode) {
        if (currentIndex < charactersArray.length) {
          this.typedText += charactersArray[currentIndex];
          currentIndex++;
        } else {
          eraseMode = true;
        }
      } else {
        if (this.typedText.length > 0) {
          this.typedText = this.typedText.slice(0, -1);
        } else {
          eraseMode = false;
          currentIndex = 0;
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.animationSubscription) {
      this.animationSubscription.unsubscribe();
    }
  }
}