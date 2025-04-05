import { Component, Input } from '@angular/core';
import { breadcrumb } from '../../../interface/breadcrumb.interface';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-breadcrumb',
    imports: [TranslateModule, RouterModule],
    templateUrl: './breadcrumb.component.html',
    styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {

  @Input() breadcrumb: breadcrumb;

}
