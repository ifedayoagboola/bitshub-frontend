import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';

import { BlogState } from '../../../shared/store/state/blog.state';
import { ThemeOptionState } from '../../../shared/store/state/theme-option.state';

import { breadcrumb } from '../../../shared/interface/breadcrumb.interface';
import { Blog } from '../../../shared/interface/blog.interface';
import { Option } from '../../../shared/interface/theme-option.interface';
import { SeoService } from '../../../shared/services/seo.service';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-blog-details',
    imports: [CommonModule, TranslateModule, BreadcrumbComponent],
    templateUrl: './blog-details.component.html',
    styleUrl: './blog-details.component.scss'
})
export class BlogDetailsComponent {

  blog$: Observable<Blog> = inject(Store).select(BlogState.selectedBlog) as Observable<Blog>;
  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;

  public breadcrumb: breadcrumb = {
    title: "Product",
    items: []
  }

  public sidebar: string;
  public StorageURL = environment.storageURL;

  constructor(
    private seoService: SeoService,
    private route: ActivatedRoute){
    this.blog$.subscribe(blog => {
      this.breadcrumb.items = [];
      this.breadcrumb.title = blog.title;
      this.breadcrumb.items.push({ label: 'Blog', active: true }, { label: blog.title, active: false });
    });

    // For Demo Purpose only
    this.route.queryParams.subscribe(params => {
      if(params['sidebar']) {
        this.sidebar = params['sidebar'];
      } else {
        // Get Blog Layout
        this.themeOption$.subscribe(theme => {
          this.sidebar = theme?.blog.blog_sidebar_type;
        });
      }
    });
  }
}
