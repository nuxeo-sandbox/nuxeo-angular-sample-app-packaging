import { Routes } from '@angular/router';
import { DocumentSearchComponent } from './document-search/document-search.component';
import { DocumentViewComponent } from './document-view/document-view.component';

export const routes: Routes = [
  {
    path: 'search',
    component: DocumentSearchComponent,
    title: 'Document Search',
    children: [{ path: 'doc/:id', component: DocumentViewComponent }],
  },
  {
    path: 'doc/:id',
    component: DocumentViewComponent,
  },
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full',
  },
];
