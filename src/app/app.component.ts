import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { ContactsPage } from './contacts/contacts.page';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default route
  { path: 'home', component: HomePage }, // Home page
  { path: 'contacts', component: ContactsPage }, // Contacts page
];

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonApp, IonRouterOutlet, FormsModule, RouterModule],
})
export class AppComponent {
  constructor() {}
}
