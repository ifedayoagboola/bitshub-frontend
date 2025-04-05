import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-no-data',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './no-data.component.html',
  styleUrl: './no-data.component.scss'
})
export class NoDataComponent {

  @Input() class: string = "no-data-added";
  @Input() image: string;
  @Input() text: string;
  @Input() description: string;

}
