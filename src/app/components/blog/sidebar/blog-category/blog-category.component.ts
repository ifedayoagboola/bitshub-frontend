import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Category } from '../../../../shared/interface/category.interface';

@Component({
    selector: 'app-blog-category',
    imports: [CommonModule, RouterModule],
    templateUrl: './blog-category.component.html',
    styleUrl: './blog-category.component.scss'
})
export class BlogCategoryComponent {

  @Input() data: Category[];

}
