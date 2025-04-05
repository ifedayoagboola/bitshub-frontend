import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Tag } from '../../../../shared/interface/tag.interface';

@Component({
    selector: 'app-blog-tag',
    imports: [CommonModule, RouterModule],
    templateUrl: './blog-tag.component.html',
    styleUrl: './blog-tag.component.scss'
})
export class BlogTagComponent {

  @Input() tags: Tag[];

}
