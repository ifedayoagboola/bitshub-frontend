import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Paginate } from '../../../interface/pagination.interface';
import { PaginationService } from '../../../services/pagination.service';

@Component({
    selector: 'app-pagination',
    imports: [CommonModule],
    templateUrl: './pagination.component.html',
    styleUrl: './pagination.component.scss'
})
export class PaginationComponent {

  @Input() public total: number;
  @Input() public currentPage: number;
  @Input() public pageSize: number;

  @Output() setPage: EventEmitter<number> = new EventEmitter();

  public paginate: Paginate; // Pagination use only

  constructor(private paginationService: PaginationService) { }

  // Detect changes
  ngOnChanges(changes: SimpleChanges) {
    this.total = changes['total'] ? changes['total'].currentValue : this.total;
    this.currentPage = changes['currentPage'] ? changes['currentPage'].currentValue : this.currentPage;
    this.pageSize = changes['pageSize'] ? changes['pageSize'].currentValue : this.pageSize;
    this.paginate = this.paginationService.getPager(this.total, this.currentPage, this.pageSize);
  }

  // Set Page
  pageSet(page: number) {
    this.setPage.emit(page);  // Set Page Number
  }


}
