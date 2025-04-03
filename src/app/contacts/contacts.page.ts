import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
import { SqlqueryService } from '../services/sqlquery.service';
import { Capacitor } from '@capacitor/core';

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
  // Main Information
  surname: string = '';
  name: string = '';
  // Born Information
  born = {
    city: '',
    department: '',
    state: '',
    country: '',
    birthDate: '',
    sex: '',
    dni: '',
    cuit: '',
  };
  // Father Information
  father = {
    surname: '',
    name: '',
    dni: '',
    cuit: '',
    nationality: '',
    type: 'father',
  };
  // Mother Information
  mother = {
    surname: '',
    name: '',
    dni: '',
    cuit: '',
    nationality: '',
    type: 'mother',
  };
  // National Identification Card
  nationalId = {
    surname: '',
    name: '',
    sex: '',
    nationality: '',
    type: '',
    birthDate: '',
    issueDate: '',
    expiryDate: '',
    idCode: '',
    documentNumber: '',
    address: '',
    placeOfBirth: '',
    cuil: '',
  };

  constructor(
    private navCtrl: NavController,
    private SQLQueryService: SqlqueryService
  ) {}

  // SQLITE CAPACITOR PLUGIN | CHECKING
  private isSQLitePluginAvailable(): boolean {
    return Capacitor.isPluginAvailable('CapacitorSQLite');
  }

  // ADD THE CONTACT TO THE DATABASE
  async addContact() {
    try {
      if (!this.isSQLitePluginAvailable()) {
        console.error('Capacitor SQLite Plugin is not available.');
        alert('Capacitor SQLite Plugin is not available.');
        return;
      }

      // await this.SQLQueryService.insertData(this.surname, this.name);
      await this.SQLQueryService.insertAllData(
        this.surname,
        this.name,
        this.born,
        this.father,
        this.mother,
        this.nationalId
      );
      console.log('Contact added successfully to database.');
    } catch (error) {
      console.error('Failed to add contact: ', error);
    }
  }

  // METHOD TO NAVIGATE TO THE HOME PAGE
  navigateToHomePage() {
    this.navCtrl.navigateForward('/home', {
      animationDirection: 'forward',
    });
  }
}
