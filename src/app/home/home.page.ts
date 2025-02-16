import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  // IonInput,
  IonButton,
  IonFooter,
  IonGrid,
  IonCol,
  IonRow,
} from '@ionic/angular/standalone';

// XEROX SERVICES AND COMPONENTS
import { SqlqueryService } from '../services/sqlquery.service';
import { DatabaseService } from '../services/database.service';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    // IonInput,
    IonButton,
    IonFooter,
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    IonGrid,
    IonCol,
    IonRow,
  ],
})
export class HomePage implements OnInit {
  //
  // VARIABLE TO STORE CONTACTS DATA FROM DATABASE
  contacts: Array<{ id: number; surname: string; name: string }> = [];

  // OBJECT TO STORE CONTACTS BY GROUPS OF LETTER
  groupedContacts: { [key: string]: Contact[] } = {};

  constructor(
    private navCtrl: NavController,
    private SqliteQueryService: SqlqueryService,
    private databaseService: DatabaseService
  ) {}

  async ngOnInit() {
    try {
      await this.loadContacts();
      console.log(
        'Contacts loaded from database. ngOnInit executed successfully.'
      );
    } catch (error) {
      console.error('Error trying to load contacts from database.', error);
    }
  }

  // LIFECYCLE EVENT: ENTER TO PAGE
  async ionViewWillEnter() {
    await this.loadContacts();
  }

  // LOAD ALL CONTACTS
  async loadContacts() {
    try {
      // WAIT FOR THE DATABSE TO BE INITIALIZED
      await this.databaseService.waitForInitialization();
      const result = await this.SqliteQueryService.selectData();
      this.contacts = result;
      this.groupedContacts = this.groupContacts(result);

      console.log('Contacts loaded successfully from database.');
    } catch (error) {
      console.error('Failed to load contacts: ', error);
    }
  }

  // GROUP CONTACTS BY FIRST LETTER
  groupContacts(contacts: Contact[]): { [key: string]: Contact[] } {
    const grouped: { [key: string]: Contact[] } = {};

    for (const contact of contacts) {
      const initial = contact.surname.charAt(0).toUpperCase();

      if (!grouped[initial]) {
        // INIT ARRAY IF DOESN'T EXIST
        grouped[initial] = [];
      }

      // ADD THE CONTACT TO THE GROUP
      grouped[initial].push(contact);
    }

    // SORT THE KEYS ALPHABETICALLY
    const sortedGrouped: { [key: string]: Contact[] } = {};
    Object.keys(grouped)
      .sort()
      .forEach((key) => {
        sortedGrouped[key] = grouped[key];
      });

    return sortedGrouped;
  }

  // METHOD TO CHECK IF GROUPED CONTACTS IS EMPTY
  hasContacts(): Boolean {
    const result = Object.keys(this.groupedContacts).length > 0;
    if (result) {
      console.log(
        `The database has ${
          Object.keys(this.groupedContacts).length
        } groups of contacts.`
      );
    } else {
      console.log('The database has no contacts.');
    }

    return result;
  }

  // METHOD TO NAVIGATE TO THE CONTACT PAGE
  navigateToContactPage() {
    this.navCtrl.navigateForward('/contacts', {
      animationDirection: 'forward',
    });
  }
}
