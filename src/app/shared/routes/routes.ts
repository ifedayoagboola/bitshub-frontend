import { Routes } from '@angular/router';
import { AuthGuard } from '../../core/guard/auth.guard';
import { Error404Component } from '../../components/page/error404/error404.component';

export const content: Routes = [
  {
    path: '',
    loadChildren: () => import('../../components/home/home.routes').then(m => m.home)
  },
  {
    path: 'account',
    loadChildren: () => import('../../components/account/account.routes').then(m => m.account),
    canActivate : [AuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('../../components/blog/blog.routes').then(m => m.blog)
  },
  {
    path: '',
    loadChildren: () => import('../../components/shop/shop.routes').then(m => m.shop)
  },
  {
    path: '',
    loadChildren: () => import('../../components/page/page.routes').then(m => m.page)
  },
  {
    path: '**',
    pathMatch: 'full',
    component: Error404Component
  }
];
