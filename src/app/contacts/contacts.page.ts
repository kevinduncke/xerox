import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
} from '@ionic/angular/standalone';

// APP SERVICES
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
  standalone: true,
  imports: [
    IonInput,
    IonLabel,
    IonItem,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    IonicModule,
    FormsModule,
  ],
})
export class ContactsPage implements OnInit {

  // ARRAY TO STORE CONTACTS
  contacts: any[] = [];

  // STRING FOR NAME INPUT FIELD
  name: string = '';
  // STRING FOR PHONE INPUT FIELD
  phone: string = '';

  constructor(private dbService: DatabaseService) {}

  async ngOnInit() {
    await this.loadContacts();
  }

  // LOAD CONTACTS FROM DATABASE
  async loadContacts() {
    this.contacts = await this.dbService.getContacts();
  }

  // ADD A CONTACT TO DATABASE
  async addContact() {
    if (this.name && this.phone) {
      await this.dbService.addContact(this.name, this.phone);

      // CLEAR INPUTS
      this.name = '';
      this.phone = '';

      // REFRESH CONTACT LIST
      await this.loadContacts();
    }
  }

  // DELETE A CONTACT BY ID
  async deleteContact(id: number) {
    await this.dbService.deleteContact(id);
    await this.loadContacts();
  }
}
