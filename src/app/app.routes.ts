import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { ContactsPage } from './contacts/contacts.page';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  { path: 'contacts', component: ContactsPage },
];
