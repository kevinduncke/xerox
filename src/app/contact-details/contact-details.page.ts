import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonLabel,
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
import { BornContact } from '../models/bornContact.model';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.page.html',
  styleUrls: ['./contact-details.page.scss'],
  standalone: true,
  imports: [
    IonLabel,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonFooter,
    IonButton,
    IonGrid,
    IonCol,
    IonRow,
    IonicModule,
    CommonModule,
    FormsModule,
  ],
})
export class ContactDetailsPage implements OnInit {

  // VARIABLE TO STORE CONTACTS DATA FROM DATABASE
  contact: Contact | null = null;
  born: BornContact | null = null;
  contactId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private SqliteQueryService: SqlqueryService,
    private databaseService: DatabaseService
  ) {}

  ngOnInit() {
    try {
      // RETRIEVE THE CONTACT ID FROM THE ROUTE PARAMETERS
      this.contactId = +this.route.snapshot.paramMap.get('id')!;
      this.loadContactDetails();
    } catch (error) {
      console.error('Failed to get contact id: ', error);
      throw new Error('Failed to get contact id.');
    }
  }

  // LOAD CONTACT DETAILS
  async loadContactDetails() {
    try {
      // WAIT FOR THE DATABASE TO BE INITIALIZED
      await this.databaseService.waitForInitialization();

      // SELECT CONTACT DETAILS FROM DATABASE
      const result = await this.SqliteQueryService.contactDetails(this.contactId)
      const resultBorn = await this.SqliteQueryService.bornDetails(this.contactId);
      
      // CHECK IF RESULT EXISTS AND ASSIGN TO CONTACT
      if(result && result.length > 0){
        this.contact = result[0]; // FIRST RESULT (SINGLE CONTACT)
      } else {
        console.warn('No contact found with ID: ', this.contactId);
        this.contact = null;
      }

      if(resultBorn && resultBorn.length > 0){
        this.born = resultBorn[0];
      } else {
        console.warn('No contact found with ID: ', this.contactId);
        this.born = null;
      }
    } catch (error) {
      console.error('Failed to load contact details:', error);
      this.contact = null; 
      this.born = null;
    }
  }

  // DELETE CONTACT
  async deleteContact(id: number) {
    try {
      // DELETE THE CONTACT FROM THE DATABASE
      await this.SqliteQueryService.deleteData(id);
      console.log('Contact deleted from database.');
      this.navigateToHomePage();
    } catch (error) {
      console.error('Failed to delete contact: ', error);
    }
  }  

  // METHOD TO NAVIGATE TO THE HOME PAGE
  navigateToHomePage() {
    this.navCtrl.navigateForward('/home', {
      animationDirection: 'forward',
    });
  }
}
