import { Component, inject } from '@angular/core';
import { breadcrumb } from '../../../shared/interface/breadcrumb.interface';
import { Select, Store } from '@ngxs/store';
import { PageState } from '../../../shared/store/state/page.state';
import { Observable } from 'rxjs';
import { FaqModel } from '../../../shared/interface/page.interface';
import { PageService } from '../../../shared/services/page.service';
import { GetFaqs } from '../../../shared/store/action/page.action';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { CommonModule } from '@angular/common';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { NoDataComponent } from '../../../shared/components/widgets/no-data/no-data.component';

@Component({
    selector: 'app-faq',
    imports: [CommonModule, NgbAccordionModule, BreadcrumbComponent,
        NoDataComponent],
    templateUrl: './faq.component.html',
    styleUrl: './faq.component.scss'
})
export class FaqComponent {

  public breadcrumb: breadcrumb = {
    title: "FAQ's",
    items: [{ label: "FAQ's", active: true }]
  }

  faq$: Observable<FaqModel> = inject(Store).select(PageState.faq);

  constructor(private store: Store, public pageService: PageService) {
    this.store.dispatch(new GetFaqs());
  }

}
