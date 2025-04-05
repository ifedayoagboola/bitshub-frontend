import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Blog } from '../../../../shared/interface/blog.interface';
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'app-blog-recent-post',
    imports: [CommonModule, RouterModule],
    templateUrl: './blog-recent-post.component.html',
    styleUrl: './blog-recent-post.component.scss'
})
export class BlogRecentPostComponent {

  @Input() blogs: Blog[];

  public StorageURL = environment.storageURL;

}
