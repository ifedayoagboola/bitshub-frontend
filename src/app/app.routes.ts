import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { content } from './shared/routes/routes';

export const routes: Routes = [
    // {
    //     path: '',
    //     redirectTo: '',
    //     pathMatch: 'full'
    // },
    {
        path: '',
        component: LayoutComponent,
        children: content
    },
];
