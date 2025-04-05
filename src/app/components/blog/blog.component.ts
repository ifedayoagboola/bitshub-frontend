import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { BreadcrumbComponent } from '../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { BlogState } from '../../shared/store/state/blog.state';
import { ThemeOptionState } from '../../shared/store/state/theme-option.state';

import { GetBlogs } from '../../shared/store/action/blog.action';

import { Blog, BlogModel } from '../../shared/interface/blog.interface';
import { breadcrumb } from '../../shared/interface/breadcrumb.interface';
import { Option } from '../../shared/interface/theme-option.interface';

import { environment } from '../../../environments/environment';
import { NoDataComponent } from '../../shared/components/widgets/no-data/no-data.component';
import { PaginationComponent } from "../../shared/components/widgets/pagination/pagination.component";
import { BlogService } from '../../shared/services/blog.service';
import { SkeletonBlogComponent } from './skeleton-blog/skeleton-blog.component';


@Component({
    selector: 'app-blog',
    imports: [CommonModule, RouterModule, TranslateModule,
    SidebarComponent, BreadcrumbComponent,
    NoDataComponent, SkeletonBlogComponent, PaginationComponent],
    templateUrl: './blog.component.html',
    styleUrl: './blog.component.scss'
})
export class BlogComponent {

  blog$: Observable<BlogModel> = inject(Store).select(BlogState.blog) as Observable<BlogModel>;
  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;

  public breadcrumb: breadcrumb = {
    title: "Blogs",
    items: []
  }

  public filter = {
    'page': 1, // Current page number
    'paginate': 12, // Display per page,
    'status': 1,
    'category': '',
    'tag': ''
  };

  public skeletonItems = Array.from({ length: 9 }, (_, index) => index);
  public totalItems: number = 0;
  public blogsArray: Blog[];
  public paginateBlog: Blog[];

  public style: string;
  public sidebar: string = 'left_sidebar';
  public StorageURL = environment.storageURL;

  constructor(private store: Store, private route: ActivatedRoute,
    public blogService: BlogService, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.filter.category = params['category'] ? params['category'] : '';
      this.filter.tag = params['tag'] ? params['tag'] : ''

      this.breadcrumb.items = [];
      this.breadcrumb.title = this.filter.category ? `Blogs: ${this.filter.category.replaceAll('-', ' ')}` :
              this.filter.tag ? `Blogs: ${this.filter.tag.replaceAll('-', ' ')}` : 'Blogs';
      this.breadcrumb.items.push({ label: 'Blogs', active: true });

      this.store.dispatch(new GetBlogs(this.filter));

      // For Demo Purpose only
      if(params['style']) {
        this.style = params['style'];
      }

      if(params['sidebar']) {
        this.sidebar = params['sidebar'];
      }

      if(!params['style'] && !params['sidebar']) {
        // Get Blog Layout
        this.themeOption$.subscribe(theme => {
          this.style = theme?.blog?.blog_style;
          this.sidebar = theme?.blog.blog_sidebar_type;
        });
      }

    });
    this.blog$.subscribe(blog => this.totalItems = blog?.total);
    this.setPage();
  }

  setPaginate(data: number) {
    this.filter.page = data;
    this.store.dispatch(new GetBlogs(this.filter));
  }

  setPage() {
    this.blog$.subscribe(res => {
      this.blogsArray = res.data;
      this.paginateBlog = this.blogsArray.map((product) => ({ ...product })).slice(
        (this.filter!['page'] - 1) * this.filter['paginate'],
        (this.filter!['page']- 1) * this.filter['paginate'] + this.filter['paginate'],
      );
    })

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: this.filter!['page']
      },
      queryParamsHandling: 'merge',
      skipLocationChange: false
    });

 	}

}
