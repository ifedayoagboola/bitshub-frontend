import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngxs/store';
import { GetPageBySlug } from '../store/action/page.action';
import { Observable } from 'rxjs';

export const PageResolver: ResolveFn<Observable<any>> = (route, state) => {
  const store = inject(Store);
  const slug = route.paramMap.get('slug');

  if (!slug) {
    throw new Error('Slug parameter is missing');
  }

  return store.dispatch(new GetPageBySlug(slug));
};
