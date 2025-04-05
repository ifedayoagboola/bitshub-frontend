import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SettingState } from '../../../../store/state/setting.state';
import { Values } from '../../../../interface/setting.interface';

@Component({
    selector: 'app-footer-logo',
    imports: [RouterModule, CommonModule],
    templateUrl: './footer-logo.component.html',
    styleUrl: './footer-logo.component.scss'
})
export class FooterLogoComponent {

  @Input() logo: string | undefined;

  setting$: Observable<Values> = inject(Store).select(SettingState.setting) as Observable<Values>;

}
