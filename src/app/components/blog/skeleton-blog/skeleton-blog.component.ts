import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-skeleton-blog',
    imports: [],
    templateUrl: './skeleton-blog.component.html',
    styleUrl: './skeleton-blog.component.scss'
})
export class SkeletonBlogComponent {

  @Input() type: string = 'grid';

}
