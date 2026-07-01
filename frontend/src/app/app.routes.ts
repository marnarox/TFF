import { Routes } from '@angular/router';
import { cantBeConnectedGuard } from '@core/guards/not-connected.guard';
import { BooksListing } from '@features/books/pages/books-listing/books-listing';

export const routes: Routes = [
  {
    path: '',
    component: BooksListing,
  },
  {
    path: 'auth',
    canActivate: [cantBeConnectedGuard],
    loadChildren: () => import('./features/auth/auth.router').then((r) => r.routes),
  },
];
