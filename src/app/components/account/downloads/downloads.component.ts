import { Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { DownloadState } from '../../../shared/store/state/download.state';
import { Observable } from 'rxjs';
import { DownloadModel } from '../../../shared/interface/download.interface';
import { Params } from '../../../shared/interface/core.interface';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DownloadFiles, DownloadLicense, Downloads } from '../../../shared/store/action/download.action';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NoDataComponent } from '../../../shared/components/widgets/no-data/no-data.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-downloads',
    imports: [CommonModule, TranslateModule, FormsModule,
        ReactiveFormsModule, NgbModule, NoDataComponent],
    templateUrl: './downloads.component.html',
    styleUrl: './downloads.component.scss'
})
export class DownloadsComponent {

  download$: Observable<DownloadModel> = inject(Store).select(DownloadState.download) as Observable<DownloadModel>;

  public filter: Params = {
    'page': 1, // Current page number
    'paginate': 10, // Display per page,
  };

  public term = new FormControl('');

  constructor(private store: Store) {
    this.store.dispatch(new Downloads(this.filter));
  }

  setPaginate(page: number) {
    this.filter['page'] = page;
    this.store.dispatch(new Downloads(this.filter));
  }

  search() {
    this.filter['search'] = this.term.value;;
    this.store.dispatch(new Downloads(this.filter));
  }

  downloadFiles(id: number) {
    this.store.dispatch(new DownloadFiles(id));
  }

  downloadLicense(id: number) {
    this.store.dispatch(new DownloadLicense(id));
  }

}
