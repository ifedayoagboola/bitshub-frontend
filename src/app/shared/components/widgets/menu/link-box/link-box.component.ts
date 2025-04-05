import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../../../interface/menu.interface';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-link-box',
    imports: [CommonModule, TranslateModule],
    templateUrl: './link-box.component.html',
    styleUrl: './link-box.component.scss'
})
export class LinkBoxComponent {

  @Input() menu: Menu

  constructor( private router: Router){
  }

  redirect(path:string){
    this.router.navigateByUrl(path)
  }
}
