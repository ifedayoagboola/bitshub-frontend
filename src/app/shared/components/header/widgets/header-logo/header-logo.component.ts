import { Component, inject, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { ThemeOptionState } from '../../../../store/state/theme-option.state';
import { Observable } from 'rxjs';
import { Option } from '../../../../interface/theme-option.interface';
import { CommonModule } from '@angular/common';
import { SettingState } from '../../../../store/state/setting.state';
import { Values } from '../../../../interface/setting.interface';

@Component({
    selector: 'app-header-logo',
    imports: [RouterModule, CommonModule],
    templateUrl: './header-logo.component.html',
    styleUrl: './header-logo.component.scss'
})
export class HeaderLogoComponent {

  @Input() logo: string | null | undefined;

  setting$: Observable<Values> = inject(Store).select(SettingState.setting) as Observable<Values>;

}
