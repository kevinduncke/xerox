import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  // IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonFooter,
} from '@ionic/angular/standalone';

/* XEROX SERVICES */
import { SqliteService } from '../services/sqlite.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    // IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonFooter,
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
  ],
})
export class ContactsPage {
  surname: string = '';
  name: string = '';

  constructor(
    private router: Router, 
    private sqliteService: SqliteService,
    private navCtrl: NavController
  ) {}

  // SAVE THE CONTACT TO THE DATABASE
  async saveContact() {
    if (this.surname && this.name) {
      try {
        await this.sqliteService.addContact(this.surname, this.name);
        this.surname = '';
        this.name = '';
        alert('Contact saved successfully!');
      } catch (error) {
        alert('Error saving contact:' + error);
      }
    } else {
      alert('Please fill in all fields.');
    }
  }

  // METHOD TO NAVIGATE TO THE HOME PAGE
  navigateToHomePage() {
    this.navCtrl.navigateForward('/home', {
      animationDirection: 'forward',
    });
  }
}
