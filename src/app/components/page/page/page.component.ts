import { Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { PageState } from '../../../shared/store/state/page.state';
import { Observable } from 'rxjs';
import { Page } from '../../../shared/interface/page.interface';
import { breadcrumb } from '../../../shared/interface/breadcrumb.interface';
import { Meta } from '@angular/platform-browser';
import { PageService } from '../../../shared/services/page.service';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { SkeletonPageComponent } from '../skeleton-page/skeleton-page.component';

@Component({
    selector: 'app-page',
    imports: [CommonModule, BreadcrumbComponent, SkeletonPageComponent],
    templateUrl: './page.component.html',
    styleUrl: './page.component.scss'
})
export class PageComponent {

  selectedPage$: Observable<Page> = inject(Store).select(PageState.selectedPage) as Observable<Page>;

  public breadcrumb: breadcrumb = {
    title: "Page",
    items: []
  }

  constructor(private meta: Meta, public pageService: PageService){
    this.selectedPage$.subscribe(page =>{
      this.breadcrumb.items = [];
      this.breadcrumb.title = page.title;
      this.breadcrumb.items.push({ label: 'Page', active: true }, { label: page.title, active: false });
      page?.meta_title && this.meta.updateTag({property: 'og:title', content: page?.meta_title});
      page?.meta_description && this.meta.updateTag({property: 'og:description', content: page?.meta_description});
    });
  }
}
